import subprocess
from datetime import datetime
from flask import jsonify
import os

def run_jmeter_test(test_filename, request, JMX_FOLDER, RESULTS_FOLDER, JMETER_PATH):
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded'}), 400
    file = request.files['file']
    jmx_file = os.path.join(JMX_FOLDER, test_filename)
    file.save(jmx_file)

    result_filename = f"{test_filename.replace('.jmx', '')}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jtl"
    result_file = os.path.join(RESULTS_FOLDER, result_filename)

    command = [JMETER_PATH, '-n', '-t', jmx_file, '-l', result_file]

    try:
        process = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        with open(result_file, 'r') as jtl_file:
            jtl_content = jtl_file.read()
        return jsonify({
            'status': 'success',
            'message': f'Test completed. Results saved to {result_filename}',
            'output': process.stdout,
            'result_file': result_filename,
            'jtl_content': jtl_content
        }), 200
    except subprocess.CalledProcessError as e:
        return jsonify({'status': 'error', 'message': f'Error executing JMeter: {e.stderr}'}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Error reading result file: {str(e)}'}), 500