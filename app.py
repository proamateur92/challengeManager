from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

import datetime

from bson.objectid import ObjectId


client = MongoClient('mongodb+srv://16thMembers:advanceToyproject@boilerplate.s8tem.mongodb.net/test?retryWrites=true&w=majority')
db = client.hanghae

now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/saveChallenge', methods=['POST'])
def saveChallenge():
    chal_title_receive = request.form['title']
    check_list_receive = request.form['checklist']
    print(chal_title_receive)
    print(check_list_receive)
    return jsonify({'result':'success', 'msg': '이 요청은 POST!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)