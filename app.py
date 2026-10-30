from flask import Flask, render_template, request, jsonify
from datetime import datetime

from chatbot import get_response

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "")

    bot_response = get_response(user_message)

    current_time = datetime.now().strftime("%I:%M %p")

    return jsonify({

        "response": bot_response,

        "time": current_time

    })


if __name__ == "__main__":
    app.run(debug=True)