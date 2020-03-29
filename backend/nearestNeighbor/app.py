from flask import Flask
import faiss 
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():

    #import fiass