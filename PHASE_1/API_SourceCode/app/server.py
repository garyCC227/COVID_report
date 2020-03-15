from flask import Flask
from .firebase import *

app = Flask(__name__)
app.secret_key = 'secret-123'
