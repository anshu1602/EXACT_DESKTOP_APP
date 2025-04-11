




import pandas as pd
import google.generativeai as genai
import smtplib
import json
from email.mime.text import MIMEText
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('jmeter.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Set up Gemini API key
GEMINI_API_KEY = "AIzaSyARWzo_UYaVxTM6w2h-Sq1uBT_NncX7pGo"
genai.configure(api_key=GEMINI_API_KEY)

# Get the base directory of the script
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Correct path to emails.json (go up one level and into the frontend folder)
EMAIL_FILE = os.path.join(BASE_DIR, "..", "frontend", "emails.json")

def send_email(result_text):
    """Send analysis results to all stored email addresses."""
    try:
        if not os.path.exists(EMAIL_FILE):
            logger.error(f"Email file not found at: {EMAIL_FILE}")
            return {"error": "No email addresses found."}

        with open(EMAIL_FILE, "r") as f:
            emails = json.load(f).get("emails", [])

        if not emails:
            logger.error("No email addresses found in emails.json")
            return {"error": "No email addresses stored."}

        logger.info(f"Emails to send: {emails}")

        sender_email = "anshuraj110011@gmail.com"  # Replace with your Gmail address if different
        sender_password = "jjhy xasx uvlj cdbk"   # New App Password provided
        subject = "JTL Analysis Results"

        # Format email message
        msg = MIMEText("Hi all,\n\nHere are the analysis results:\n\n" + result_text)
        msg["Subject"] = subject
        msg["From"] = sender_email
        msg["To"] = ", ".join(emails)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, emails, msg.as_string())

        logger.info(f"Email sent to {len(emails)} recipients.")
        return {"success": f"Email sent to {len(emails)} recipients."}

    except Exception as e:
        logger.error(f"Error in send_email: {str(e)}")
        return {"error": f"Failed to send email: {str(e)}"}

def analyze_jtl(file_path):
    try:
        logger.info(f"Starting JTL analysis for file: {file_path}")
        df = pd.read_csv(file_path)
        required_columns = {"label", "elapsed", "responseCode", "allThreads"}
        if not required_columns.issubset(df.columns):
            logger.error("Missing required columns in JTL file")
            return {"error": "The uploaded file is missing required columns."}

        summary = df.groupby("label").agg(
            avg_response_time=("elapsed", "mean"),
            error_rate=("responseCode", lambda x: (x.astype(str) != '200').mean() * 100),
            throughput=("label", "count"),
            concurrent_users=("allThreads", "max")
        ).reset_index()

        performance_summary = "\n".join(
            f"The {row['label']} API shows an average response time of {row['avg_response_time']:.2f}ms "
            f"with an error rate of {row['error_rate']:.2f}%. "
            f"Throughput is {row['throughput']} requests over {row['concurrent_users']} users."
            for _, row in summary.iterrows()
        )

        messages = [
            {
                "role": "user",
                "parts": [{"text": (
                    "You are a performance analysis assistant. "
                    "Your task is to generate a structured summary of API performance metrics, "
                    "root cause analysis for failures and performance issues, "
                    "and provide suggestions to improve performance.\n\n"
                    f"Here are the performance test results:\n\n{performance_summary}\n\n"
                    "Provide root cause analysis for any failures and performance issues. "
                    "Suggest ways to improve performance and fix failures."
                    "Give the output in Markdown only"
                )}]
            }
        ]

        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(messages)
        analysis_result = response.text if response else "Error: No response from Gemini API."

        logger.info("JTL analysis completed successfully")
        return {
            "analysis": analysis_result
        }

    except Exception as e:
        logger.error(f"Error processing JTL file: {str(e)}")
        return {"error": f"Error processing JTL file: {str(e)}"}