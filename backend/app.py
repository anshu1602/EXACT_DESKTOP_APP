

# from flask import Flask, request, jsonify, send_from_directory, send_file
# from flask_cors import CORS
# import os
# import json
# from io import BytesIO
# from dotenv import load_dotenv
# import google.generativeai as genai
# from sentence_transformers import SentenceTransformer, util
# import xml.etree.ElementTree as ET
# from intelligent_test_analysis import analyze_jtl, send_email
# from run_test import run_jmeter_test
# import logging

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(levelname)s - %(message)s',
#     handlers=[
#         logging.FileHandler('app.log'),
#         logging.StreamHandler()
#     ]
# )
# logger = logging.getLogger(__name__)

# # Initialize Flask
# app = Flask(__name__, static_folder='static')
# CORS(app)

# # Load environment variables
# load_dotenv()
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyARWzo_UYaVxTM6w2h-Sq1uBT_NncX7pGo")
# genai.configure(api_key=GEMINI_API_KEY)

# # Initialize SentenceTransformer
# model = SentenceTransformer("all-MiniLM-L6-v2")

# # # File paths
# # BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# # UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
# # JMX_FOLDER = os.path.join(BASE_DIR, "jmx_files")
# # RESULTS_FOLDER = os.path.join(BASE_DIR, "results")
# # STATIC_FOLDER = os.path.join(BASE_DIR, "static")
# # #JMETER_PATH = r"C:\apache-jmeter-5.6.3\bin\jmeter.bat"  # Update if needed
# # JMETER_PATH = os.path.join(BASE_DIR, "apache-jmeter-5.6.3", "bin", "jmeter.bat")


# # # Ensure folders exist
# # for folder in [UPLOAD_FOLDER, JMX_FOLDER, RESULTS_FOLDER, STATIC_FOLDER]:
# #     os.makedirs(folder, exist_ok=True)
# #     logger.info(f"Created directory if not exists: {folder}")

# # Paths for uploads, JMeter, JMX files, results, and licenses
# def get_base_dir():
#     return os.path.abspath(os.path.dirname(__file__))

# BASE_DIR = get_base_dir()
# UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
# JMX_FOLDER = os.path.join(BASE_DIR, "jmx_files")
# RESULTS_FOLDER = os.path.join(BASE_DIR, "results")
# STATIC_FOLDER = os.path.join(BASE_DIR, "static")
# LICENSE_FOLDER = os.path.join(BASE_DIR, "licenses")
# JMETER_PATH = os.path.join(BASE_DIR, "apache-jmeter-5.6.3", "bin", "jmeter.bat")
# #JMETER_PATH = r"C:\apache-jmeter-5.6.3\bin\jmeter.bat"  # Update if needed

# # Ensure necessary folders exist
# for folder in [UPLOAD_FOLDER, JMX_FOLDER, RESULTS_FOLDER, STATIC_FOLDER, LICENSE_FOLDER]:
#     if not os.path.exists(folder):
#         logger.error(f"Folder does not exist: {folder}")
#         raise FileNotFoundError(f"Folder does not exist: {folder}")
#     os.makedirs(folder, exist_ok=True)
#     logger.info(f"Created directory if not exists: {folder}")

# # Load JSON for semantic search
# def load_json_and_embed(filename):
#     with open(filename, "r") as f:
#         data = json.load(f)
#     headings = list(data.keys())
#     embeddings = model.encode(headings, convert_to_tensor=True)
#     return data, headings, embeddings

# #samplers, sampler_headings, sampler_embeddings = load_json_and_embed("samplers.json")
# #controllers, controller_headings, controller_embeddings = load_json_and_embed("controllers.json")
# #timers, timer_headings, timer_embeddings = load_json_and_embed("timers.json")
# #listeners, listener_headings, listener_embeddings = load_json_and_embed("listeners.json")

# # Utility Functions
# def semantic_search(query, headings, embeddings, json_data):
#     query_embedding = model.encode(query, convert_to_tensor=True)
#     similarities = util.pytorch_cos_sim(query_embedding, embeddings)[0]
#     top_index = similarities.argmax().item()
#     best_match_heading = headings[top_index]
#     return json_data[best_match_heading]

# def find_best_xml(component_list, headings, embeddings, json_data):
#     return [semantic_search(component, headings, embeddings, json_data) for component in component_list]

# def clean_output(output, tag):
#     return output.replace(f"```{tag}", '').replace('```', '').strip()

# # ==== ROUTES ====

# # Serve Frontend (Optional)
# @app.route('/')
# def serve_frontend():
#     try:
#         logger.info("Serving frontend")
#         return send_from_directory(STATIC_FOLDER, "")
#     except Exception as e:
#         logger.error(f"Error serving frontend: {str(e)}")
#         return jsonify({'status': 'error', 'message': 'Failed to serve frontend'}), 500

# # Run JMeter Test
# @app.route('/run-test/<test_filename>', methods=['POST'])
# def run_test_endpoint(test_filename):
#     try:
#         logger.info(f"Running JMeter test for file: {test_filename}")
#         result = run_jmeter_test(test_filename, request, JMX_FOLDER, RESULTS_FOLDER, JMETER_PATH)
#         return result
#     except Exception as e:
#         logger.error(f"Error running JMeter test: {str(e)}")
#         return jsonify({'status': 'error', 'message': f'Failed to run test: {str(e)}'}), 500

# # Download Result File
# @app.route('/download/<filename>', methods=['GET'])
# def download_file(filename):
#     try:
#         logger.info(f"Downloading result file: {filename}")
#         return send_from_directory(RESULTS_FOLDER, filename, as_attachment=True)
#     except FileNotFoundError:
#         logger.error(f"Result file not found: {filename}")
#         return jsonify({'status': 'error', 'message': 'File not found'}), 404
#     except Exception as e:
#         logger.error(f"Error downloading file: {str(e)}")
#         return jsonify({'status': 'error', 'message': f'Failed to download file: {str(e)}'}), 500

# # Analyze JTL File
# @app.route("/analyzeJTL", methods=["POST"])
# def analyze_jtl_api():
#     try:
#         if "file" not in request.files:
#             logger.error("No file uploaded in analyzeJTL request")
#             return jsonify({"error": "No file uploaded"}), 400

#         file = request.files["file"]
#         if file.filename == "":
#             logger.error("Empty file uploaded in analyzeJTL request")
#             return jsonify({"error": "Empty file uploaded"}), 400

#         file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(file_path)
#         logger.info(f"Saved JTL file for analysis: {file_path}")

#         result = analyze_jtl(file_path)
#         logger.info(f"JTL analysis completed for file: {file.filename}")
#         return jsonify(result)
#     except Exception as e:
#         logger.error(f"Error analyzing JTL file: {str(e)}")
#         return jsonify({"error": f"Failed to analyze JTL file: {str(e)}"}), 500

# # Send Email Endpoint
# @app.route("/sendEmail", methods=["POST"])
# def send_email_api():
#     try:
#         data = request.json
#         result_text = data.get("analysis", "")
#         if not result_text:
#             logger.error("No analysis result provided in sendEmail request")
#             return jsonify({"error": "No analysis result provided."}), 400
#         response = send_email(result_text)
#         logger.info("Email sent successfully")
#         return jsonify(response)
#     except Exception as e:
#         logger.error(f"Failed to send email: {str(e)}")
#         return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

# # Generate JMX from Input
# @app.route('/generate-jmx', methods=['POST'])
# def generate_jmx():
#     try:
#         data = request.json
#         task = data.get('input')

#         if not task:
#             logger.error("Input description is required in generate-jmx request")
#             return jsonify({"error": "Input description is required."}), 400

#         # Prompt for JSON generation
#         prompt_json = f'''
# You are an English-to-JSON converter for JMeter test plans...
# (New Input): "{task}"
# (Expected JSON Output Format):
# {{
#   "test_plan": {{
#     "name": "Generated Test Plan",
#     "users": [Extract from input],
#     "endpoint": [Extract from input],
#     "request_type": [Extract from input],
#     "frequency": [Extract from input, if applicable],
#     "duration": [Extract from input, if applicable],
#     "assertions": [Extract assertions if mentioned]
#   }},
#   "components_used": {{
#     "Samplers": [Generate based on input],
#     "Timers": [Generate based on input],
#     "Controllers": [Generate based on input],
#     "Listeners": [Generate based on input]
#   }}
# }}
#         '''
#         gemini_model_json = genai.GenerativeModel('gemini-2.0-flash-thinking-exp-01-21')
#         json_response = gemini_model_json.generate_content(prompt_json)
#         cleaned_json_output = clean_output(json_response.text.strip(), 'json')
#         test_plan = json.loads(cleaned_json_output)

#         # Semantic search for components
#         components_used = test_plan["components_used"]
#         best_samplers = find_best_xml(components_used["Samplers"], sampler_headings, sampler_embeddings, samplers)
#         best_controllers = find_best_xml(components_used["Controllers"], controller_headings, controller_embeddings, controllers)
#         best_timers = find_best_xml(components_used["Timers"], timer_headings, timer_embeddings, timers)
#         best_listeners = find_best_xml(components_used["Listeners"], listener_headings, listener_embeddings, listeners)

#         matched_components = {
#             "Samplers": best_samplers,
#             "Controllers": best_controllers,
#             "Timers": best_timers,
#             "Listeners": best_listeners
#         }

#         # Prompt for JMX XML
#         prompt_jmx = f'''
# You are an AI that converts JSON into JMeter-compatible XML (.jmx format).
# Based on the query {task}:
# JSON Test Plan Input:
# {json.dumps(test_plan, indent=2)}
# Matched Components:
# {json.dumps(matched_components, indent=2)}
# Instructions:
# Use the above code to create a valid JMeter test plan in XML.

# Output (in .jmx format):
# Generate a valid JMeter test plan.
#         '''
#         gemini_model_jmx = genai.GenerativeModel('gemini-2.0-flash-thinking-exp-01-21')
#         jmx_response = gemini_model_jmx.generate_content(prompt_jmx)
#         cleaned_jmx_output = clean_output(jmx_response.text.strip(), 'xml')

#         try:
#             ET.fromstring(cleaned_jmx_output)
#         except ET.ParseError as e:
#             logger.error(f"Generated JMX is not valid XML: {str(e)}")
#             return jsonify({"error": f"Generated JMX is not valid XML: {str(e)}"}), 500

#         jmx_bytes = BytesIO(cleaned_jmx_output.encode('utf-8'))
#         jmx_bytes.seek(0)
#         logger.info("Generated JMX file successfully")
#         return send_file(
#             jmx_bytes,
#             as_attachment=True,
#             download_name='generated_test_plan.jmx',
#             mimetype='application/xml'
#         )
#     except Exception as e:
#         logger.error(f"Error in generate-jmx: {str(e)}")
#         return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# if __name__ == '__main__':
#     logger.info("Starting Flask app on port 5000")
#     app.run(debug=True, port=5000, use_reloader=False)


































# # E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\backend\app.py
# import os
# import sys
# import logging
# from flask import Flask, request, jsonify, send_from_directory, send_file
# from flask_cors import CORS
# from intelligent_test_analysis import analyze_jtl, send_email
# from run_test import run_jmeter_test
# from generate_test_plan import generate_jmeter_test_plan

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(levelname)s - %(message)s',
#     handlers=[
#         logging.FileHandler('app.log'),
#         logging.StreamHandler()
#     ]
# )
# logger = logging.getLogger(__name__)

# # Configure Flask app
# app = Flask(__name__, static_folder='static')
# CORS(app)

# # Function to get the base directory (works with PyInstaller)
# def get_base_dir():
#     if getattr(sys, 'frozen', False):
#         # If the app is bundled by PyInstaller, use the temporary extraction path
#         return sys._MEIPASS
#     else:
#         # Otherwise, use the directory of this file
#         return os.path.abspath(os.path.dirname(__file__))

# # Paths for uploads, JMeter, JMX files, results, and licenses
# BASE_DIR = get_base_dir()
# UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
# JMX_FOLDER = os.path.join(BASE_DIR, "jmx_files")
# RESULTS_FOLDER = os.path.join(BASE_DIR, "results")
# STATIC_FOLDER = os.path.join(BASE_DIR, "static")
# LICENSE_FOLDER = os.path.join(BASE_DIR, "licenses")

# # JMeter path will be set dynamically
# JMETER_PATH = None

# # Fallback JMeter path if not set dynamically
# FALLBACK_JMETER_PATH = os.path.join(BASE_DIR, "apache-jmeter-5.6.3", "bin", "jmeter.bat")

# # Endpoint to set JMeter path
# @app.route('/set-jmeter-path', methods=['POST'])
# def set_jmeter_path():
#     global JMETER_PATH
#     try:
#         data = request.json
#         jmeter_path = data.get('jmeterPath', '')
#         if not jmeter_path:
#             logger.error("No JMeter path provided in request")
#             return jsonify({"error": "No JMeter path provided"}), 400

#         if not os.path.exists(jmeter_path):
#             logger.error(f"JMeter path does not exist: {jmeter_path}")
#             return jsonify({"error": f"JMeter path does not exist: {jmeter_path}"}), 400

#         JMETER_PATH = jmeter_path
#         logger.info(f"JMeter path set to: {JMETER_PATH}")
#         return jsonify({"status": "success", "message": "JMeter path set successfully"}), 200
#     except Exception as e:
#         logger.error(f"Error setting JMeter path: {str(e)}")
#         return jsonify({"error": f"Failed to set JMeter path: {str(e)}"}), 500

# # Ensure necessary folders exist
# for folder in [UPLOAD_FOLDER, JMX_FOLDER, RESULTS_FOLDER, STATIC_FOLDER, LICENSE_FOLDER]:
#     if not os.path.exists(folder):
#         logger.error(f"Folder does not exist: {folder}")
#         raise FileNotFoundError(f"Folder does not exist: {folder}")
#     os.makedirs(folder, exist_ok=True)
#     logger.info(f"Created directory if not exists: {folder}")

# # ==== ROUTES ====

# # Serve Frontend
# @app.route('/')
# def serve_frontend():
#     try:
#         logger.info("Serving frontend index.html")
#         return send_from_directory(STATIC_FOLDER, "index.html")  # Serve index.html
#     except Exception as e:
#         logger.error(f"Error serving frontend: {str(e)}")
#         return jsonify({'status': 'error', 'message': 'Failed to serve frontend'}), 500

# # Serve Static Files (for CSS, JS, etc.)
# @app.route('/static/<path:filename>')
# def serve_static(filename):
#     try:
#         logger.info(f"Serving static file: {filename}")
#         return send_from_directory(STATIC_FOLDER, filename)
#     except Exception as e:
#         logger.error(f"Error serving static file: {str(e)}")
#         return jsonify({'status': 'error', 'message': 'Failed to serve static file'}), 500

# # Run JMeter Test
# @app.route('/run-test/<test_filename>', methods=['POST'])
# def run_test_endpoint(test_filename):
#     global JMETER_PATH
#     try:
#         # Use dynamically set JMETER_PATH, or fallback to bundled path
#         jmeter_path = JMETER_PATH if JMETER_PATH else FALLBACK_JMETER_PATH
#         if not os.path.exists(jmeter_path):
#             logger.error(f"JMeter path does not exist: {jmeter_path}")
#             return jsonify({'status': 'error', 'message': f'JMeter path does not exist: {jmeter_path}'}), 400
#         logger.info(f"Running JMeter test for file: {test_filename}")
#         result = run_jmeter_test(test_filename, request, JMX_FOLDER, RESULTS_FOLDER, jmeter_path)
#         return result
#     except Exception as e:
#         logger.error(f"Error running JMeter test: {str(e)}")
#         return jsonify({'status': 'error', 'message': f'Failed to run test: {str(e)}'}), 500

# # Download Result File
# @app.route('/download/<filename>', methods=['GET'])
# def download_file(filename):
#     try:
#         logger.info(f"Downloading result file: {filename}")
#         return send_from_directory(RESULTS_FOLDER, filename, as_attachment=True)
#     except FileNotFoundError:
#         logger.error(f"Result file not found: {filename}")
#         return jsonify({'status': 'error', 'message': 'File not found'}), 404
#     except Exception as e:
#         logger.error(f"Error downloading file: {str(e)}")
#         return jsonify({'status': 'error', 'message': f'Failed to download file: {str(e)}'}), 500

# # Analyze JTL File
# @app.route("/analyzeJTL", methods=["POST"])
# def analyze_jtl_api():
#     try:
#         if "file" not in request.files:
#             logger.error("No file uploaded in analyzeJTL request")
#             return jsonify({"error": "No file uploaded"}), 400

#         file = request.files["file"]
#         if file.filename == "":
#             logger.error("Empty file uploaded in analyzeJTL request")
#             return jsonify({"error": "Empty file uploaded"}), 400

#         file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(file_path)
#         logger.info(f"Saved JTL file for analysis: {file_path}")

#         result = analyze_jtl(file_path)
#         logger.info(f"JTL analysis completed for file: {file.filename}")
#         return jsonify(result)
#     except Exception as e:
#         logger.error(f"Error analyzing JTL file: {str(e)}")
#         return jsonify({"error": f"Failed to analyze JTL file: {str(e)}"}), 500

# # Send Email Endpoint
# @app.route("/sendEmail", methods=["POST"])
# def send_email_api():
#     try:
#         data = request.json
#         result_text = data.get("analysis", "")
#         if not result_text:
#             logger.error("No analysis result provided in sendEmail request")
#             return jsonify({"error": "No analysis result provided."}), 400
#         response = send_email(result_text)
#         logger.info("Email sent successfully")
#         return jsonify(response)
#     except Exception as e:
#         logger.error(f"Failed to send email: {str(e)}")
#         return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

# # Generate JMeter Test Plan Endpoint
# @app.route("/generate-test-plan", methods=["POST"])
# def generate_test_plan():
#     try:
#         data = request.json
#         user_input = {
#             "api_endpoint": data.get("api_endpoint", ""),
#             "num_users": data.get("num_users", 100),
#             "ramp_up": data.get("ramp_up", 60),
#             "duration": data.get("duration", 300)
#         }
#         test_type = data.get("test_type", "load")

#         result, status_code = generate_jmeter_test_plan(user_input, test_type)
#         logger.info(f"Generated JMeter test plan: {result}")
#         return jsonify(result), status_code
#     except Exception as e:
#         logger.error(f"Error in test plan generation: {str(e)}")
#         return jsonify({"status": "error", "message": f"Error in test plan generation: {str(e)}"}), 500

# # Download JMX File Endpoint
# @app.route('/download-jmx/<filename>', methods=['GET'])
# def download_jmx_file(filename):
#     try:
#         logger.info(f"Downloading JMX file: {filename}")
#         return send_from_directory(JMX_FOLDER, filename, as_attachment=True)
#     except FileNotFoundError:
#         logger.error(f"JMX file not found: {filename}")
#         return jsonify({'status': 'error', 'message': 'JMX file not found'}), 404
#     except Exception as e:
#         logger.error(f"Error downloading JMX file: {str(e)}")
#         return jsonify({'status': 'error', 'message': f'Failed to download JMX file: {str(e)}'}), 500

# # Upload License Endpoint
# @app.route("/uploadLicense", methods=["POST"])
# def upload_license():
#     try:
#         logger.info("Received license upload request")
#         if "licenseFile" not in request.files:
#             logger.error("No license file uploaded in request")
#             return jsonify({"error": "No license file uploaded"}), 400

#         file = request.files["licenseFile"]
#         if file.filename == "":
#             logger.error("Empty license file uploaded in request")
#             return jsonify({"error": "Empty file uploaded"}), 400

#         # Validate file type (allow .txt, .pdf, .docx)
#         allowed_extensions = {'.txt', '.pdf', '.docx'}
#         file_ext = os.path.splitext(file.filename)[1].lower()
#         if file_ext not in allowed_extensions:
#             logger.error(f"Invalid file type for license: {file.filename}")
#             return jsonify({"success": False, "error": f"Invalid file type. Only {', '.join(allowed_extensions)} files are allowed."}), 400

#         # Save the file to the licenses folder
#         file_path = os.path.join(LICENSE_FOLDER, file.filename)
#         logger.info(f"Saving license file to: {file_path}")
#         file.save(file_path)
#         logger.info(f"License file saved successfully: {file_path}")

#         # Return success message
#         message = f"License file '{file.filename}' uploaded successfully."
#         return jsonify({"success": True, "message": message}), 200
#     except Exception as e:
#         logger.error(f"Failed to save license file: {str(e)}", exc_info=True)
#         return jsonify({"error": f"Failed to save license file: {str(e)}"}), 500

# if __name__ == "__main__":
#     logger.info("Starting Flask app on port 5000")
#     app.run(debug=False, host='0.0.0.0', port=5000, use_reloader=False)









# E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\backend\app.py
import os
import sys
import logging
import json
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from intelligent_test_analysis import analyze_jtl, send_email
from run_test import run_jmeter_test
from generate_test_plan import generate_jmeter_test_plan

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configure Flask app
app = Flask(__name__, static_folder='static')
CORS(app, origins=["http://localhost:3000", "file://"])  # Allow CORS for frontend origins

# Function to get the base directory (works with PyInstaller)
def get_base_dir():
    if getattr(sys, 'frozen', False):
        # If the app is bundled by PyInstaller, use the temporary extraction path
        return sys._MEIPASS
    else:
        # Otherwise, use the directory of this file
        return os.path.abspath(os.path.dirname(__file__))

# Paths for uploads, JMeter, JMX files, results, and licenses
BASE_DIR = get_base_dir()
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
JMX_FOLDER = os.path.join(BASE_DIR, "jmx_files")
RESULTS_FOLDER = os.path.join(BASE_DIR, "results")
STATIC_FOLDER = os.path.join(BASE_DIR, "static")
LICENSE_FOLDER = os.path.join(BASE_DIR, "licenses")
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")

# JMeter path will be set dynamically (directory path)
JMETER_PATH = ""

# Load JMETER_PATH from config.json at startup
def load_jmeter_path():
    global JMETER_PATH
    try:
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                config = json.load(f)
                JMETER_PATH = config.get("jmeter_path", "")
                logger.info(f"Loaded JMETER_PATH from config.json: {JMETER_PATH}")
        else:
            logger.info("config.json not found, JMETER_PATH remains empty")
    except Exception as e:
        logger.error(f"Error loading JMETER_PATH from config.json: {str(e)}")

# Save JMETER_PATH to config.json
def save_jmeter_path(path):
    try:
        config = {"jmeter_path": path}
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=4)
        logger.info(f"Saved JMETER_PATH to config.json: {path}")
    except Exception as e:
        logger.error(f"Error saving JMETER_PATH to config.json: {str(e)}")
        raise

# Middleware to block routes if JMETER_PATH is not set
def require_jmeter_path(f):
    def wrapper(*args, **kwargs):
        if not JMETER_PATH or not os.path.exists(JMETER_PATH):
            logger.error("JMETER_PATH not set or invalid")
            return jsonify({"error": "JMETER_PATH not set. Please set the JMeter path to proceed."}), 400
        # Check if jmeter.bat exists in the directory
        jmeter_bat_path = os.path.join(JMETER_PATH, "jmeter.bat")
        if not os.path.isfile(jmeter_bat_path):
            logger.error(f"jmeter.bat not found in JMETER_PATH: {JMETER_PATH}")
            return jsonify({"error": f"jmeter.bat not found in JMETER_PATH: {JMETER_PATH}"}), 400
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# Ensure necessary folders exist
for folder in [UPLOAD_FOLDER, JMX_FOLDER, RESULTS_FOLDER, STATIC_FOLDER, LICENSE_FOLDER]:
    if not os.path.exists(folder):
        logger.error(f"Folder does not exist: {folder}")
        raise FileNotFoundError(f"Folder does not exist: {folder}")
    os.makedirs(folder, exist_ok=True)
    logger.info(f"Created directory if not exists: {folder}")

# Load JMETER_PATH at startup
load_jmeter_path()

# ==== ROUTES ====

# Serve Frontend
@app.route('/')
@require_jmeter_path
def serve_frontend():
    try:
        logger.info("Serving frontend index.html")
        return send_from_directory(STATIC_FOLDER, "index.html")  # Serve index.html
    except Exception as e:
        logger.error(f"Error serving frontend: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to serve frontend'}), 500

# Serve Static Files (for CSS, JS, etc.)
@app.route('/static/<path:filename>')
@require_jmeter_path
def serve_static(filename):
    try:
        logger.info(f"Serving static file: {filename}")
        return send_from_directory(STATIC_FOLDER, filename)
    except Exception as e:
        logger.error(f"Error serving static file: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to serve static file'}), 500

# Endpoint to set JMeter path
@app.route('/set-jmeter-path', methods=['POST'])
def set_jmeter_path():
    global JMETER_PATH
    try:
        data = request.json
        jmeter_path = data.get('jmeterPath', '')
        if not jmeter_path:
            logger.error("No JMeter path provided in request")
            return jsonify({"error": "No JMeter path provided"}), 400

        # Normalize path (convert backslashes to forward slashes)
        jmeter_path = jmeter_path.replace('\\', '/')

        if not os.path.exists(jmeter_path):
            logger.error(f"JMeter path does not exist: {jmeter_path}")
            return jsonify({"error": f"JMeter path does not exist: {jmeter_path}"}), 400

        if not os.path.isdir(jmeter_path):
            logger.error(f"JMeter path is not a directory: {jmeter_path}")
            return jsonify({"error": f"JMeter path is not a directory: {jmeter_path}"}), 400

        # Check if the directory is named "bin"
        if os.path.basename(jmeter_path).lower() != "bin":
            logger.error(f"JMeter path is not a bin directory: {jmeter_path}")
            return jsonify({"error": f"JMeter path is not a bin directory: {jmeter_path}"}), 400

        # Check if the parent directory starts with "apache-jmeter"
        parent_dir = os.path.basename(os.path.dirname(jmeter_path)).lower()
        if not parent_dir.startswith("apache-jmeter"):
            logger.error(f"Parent directory does not start with 'apache-jmeter': {jmeter_path}")
            return jsonify({"error": f"Parent directory does not start with 'apache-jmeter': {jmeter_path}"}), 400

        # Check if jmeter.bat exists in the directory
        jmeter_bat = os.path.join(jmeter_path, "jmeter.bat")
        if not os.path.isfile(jmeter_bat):
            logger.error(f"jmeter.bat not found inside the folder: {jmeter_path}")
            return jsonify({"error": f"jmeter.bat not found inside the folder: {jmeter_path}"}), 400

        # Save the path to config.json
        save_jmeter_path(jmeter_path)

        JMETER_PATH = jmeter_path
        logger.info(f"JMeter path set to: {JMETER_PATH}")
        return jsonify({"status": "success", "message": "JMeter bin folder path saved successfully."}), 200
    except Exception as e:
        logger.error(f"Error setting JMeter path: {str(e)}")
        return jsonify({"error": f"Failed to set JMeter path: {str(e)}"}), 500

# Endpoint to get JMeter path
@app.route('/get-jmeter-path', methods=['GET'])
def get_jmeter_path():
    return jsonify({"jmeter_path": JMETER_PATH})

# Run JMeter Test
@app.route('/run-test/<test_filename>', methods=['POST'])
@require_jmeter_path
def run_test_endpoint(test_filename):
    global JMETER_PATH
    try:
        # Construct the full path to jmeter.bat
        jmeter_bat_path = os.path.join(JMETER_PATH, "jmeter.bat")
        logger.info(f"Running JMeter test for file: {test_filename}")
        result = run_jmeter_test(test_filename, request, JMX_FOLDER, RESULTS_FOLDER, jmeter_bat_path)
        return result
    except Exception as e:
        logger.error(f"Error running JMeter test: {str(e)}")
        return jsonify({'status': 'error', 'message': f'Failed to run test: {str(e)}'}), 500

# Download Result File
@app.route('/download/<filename>', methods=['GET'])
@require_jmeter_path
def download_file(filename):
    try:
        logger.info(f"Downloading result file: {filename}")
        return send_from_directory(RESULTS_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        logger.error(f"Result file not found: {filename}")
        return jsonify({'status': 'error', 'message': 'File not found'}), 404
    except Exception as e:
        logger.error(f"Error downloading file: {str(e)}")
        return jsonify({'status': 'error', 'message': f'Failed to download file: {str(e)}'}), 500

# Analyze JTL File
@app.route("/analyzeJTL", methods=["POST"])
@require_jmeter_path
def analyze_jtl_api():
    try:
        if "file" not in request.files:
            logger.error("No file uploaded in analyzeJTL request")
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            logger.error("Empty file uploaded in analyzeJTL request")
            return jsonify({"error": "Empty file uploaded"}), 400

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        logger.info(f"Saved JTL file for analysis: {file_path}")

        result = analyze_jtl(file_path)
        logger.info(f"JTL analysis completed for file: {file.filename}")
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error analyzing JTL file: {str(e)}")
        return jsonify({"error": f"Failed to analyze JTL file: {str(e)}"}), 500

# Send Email Endpoint
@app.route("/sendEmail", methods=["POST"])
@require_jmeter_path
def send_email_api():
    try:
        data = request.json
        result_text = data.get("analysis", "")
        if not result_text:
            logger.error("No analysis result provided in sendEmail request")
            return jsonify({"error": "No analysis result provided."}), 400
        response = send_email(result_text)
        logger.info("Email sent successfully")
        return jsonify(response)
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

# Generate JMeter Test Plan Endpoint
@app.route("/generate-test-plan", methods=["POST"])
@require_jmeter_path
def generate_test_plan():
    try:
        data = request.json
        user_input = {
            "api_endpoint": data.get("api_endpoint", ""),
            "num_users": data.get("num_users", 100),
            "ramp_up": data.get("ramp_up", 60),
            "duration": data.get("duration", 300)
        }
        test_type = data.get("test_type", "load")

        result, status_code = generate_jmeter_test_plan(user_input, test_type)
        logger.info(f"Generated JMeter test plan: {result}")
        return jsonify(result), status_code
    except Exception as e:
        logger.error(f"Error in test plan generation: {str(e)}")
        return jsonify({"status": "error", "message": f"Error in test plan generation: {str(e)}"}), 500

# Download JMX File Endpoint
@app.route('/download-jmx/<filename>', methods=['GET'])
@require_jmeter_path
def download_jmx_file(filename):
    try:
        logger.info(f"Downloading JMX file: {filename}")
        return send_from_directory(JMX_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        logger.error(f"JMX file not found: {filename}")
        return jsonify({'status': 'error', 'message': 'JMX file not found'}), 404
    except Exception as e:
        logger.error(f"Error downloading JMX file: {str(e)}")
        return jsonify({'status': 'error', 'message': f'Failed to download JMX file: {str(e)}'}), 500

# Upload License Endpoint
@app.route("/uploadLicense", methods=["POST"])
@require_jmeter_path
def upload_license():
    try:
        logger.info("Received license upload request")
        if "licenseFile" not in request.files:
            logger.error("No license file uploaded in request")
            return jsonify({"error": "No license file uploaded"}), 400

        file = request.files["licenseFile"]
        if file.filename == "":
            logger.error("Empty file uploaded in request")
            return jsonify({"error": "Empty file uploaded"}), 400

        # Validate file type (allow .txt, .pdf, .docx)
        allowed_extensions = {'.txt', '.pdf', '.docx'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in allowed_extensions:
            logger.error(f"Invalid file type for license: {file.filename}")
            return jsonify({"success": False, "error": f"Invalid file type. Only {', '.join(allowed_extensions)} files are allowed."}), 400

        # Save the file to the licenses folder
        file_path = os.path.join(LICENSE_FOLDER, file.filename)
        logger.info(f"Saving license file to: {file_path}")
        file.save(file_path)
        logger.info(f"License file saved successfully: {file_path}")

        # Return success message
        message = f"License file '{file.filename}' uploaded successfully."
        return jsonify({"success": True, "message": message}), 200
    except Exception as e:
        logger.error(f"Failed to save license file: {str(e)}", exc_info=True)
        return jsonify({"error": f"Failed to save license file: {str(e)}"}), 500

if __name__ == "__main__":
    logger.info("Starting Flask app on port 5000")
    app.run(debug=False, host='0.0.0.0', port=5000, use_reloader=False)