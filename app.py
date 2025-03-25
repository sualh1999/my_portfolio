import os
import logging
from flask import Flask, render_template

# Setup logging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")

@app.route('/')
def index():
    """Render the single-page portfolio website."""
    return render_template('index.html')

# If this script is run directly, start the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
