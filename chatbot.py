# chatbot.py

from faq_data import FAQS


def get_response(user_message):

    # Convert to lowercase
    user_message = user_message.lower().strip()

    # Search in FAQ Dictionary
    if user_message in FAQS:
        return FAQS[user_message]

    # If Question Not Found
    return "Sorry! I don't know the answer to this question."