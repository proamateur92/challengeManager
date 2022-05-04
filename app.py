from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

import datetime

from bson.objectid import ObjectId


client = MongoClient('mongodb+srv://16thMembers:advanceToyproject@boilerplate.s8tem.mongodb.net/test?retryWrites=true&w=majority')
db = client.hanghae



@app.route('/')
def home():
    return render_template('index.html')

@app.route('/getChallenge', methods=['GET'])
def showChallenge():
    challenge_items = list(db.challenge.find({},{'_id':False}))
    return jsonify({'challenges':challenge_items})

@app.route('/saveChallenge', methods=['POST'])
def saveChallenge():
    chal_title_receive = request.form['title']
    check_list_receive = request.form['checklist']
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    doc = {
        'title': chal_title_receive,
        'checkList': check_list_receive,
        'createDate': now,
        'updateDate': ''
    }
    db.challenge.insert_one(doc)
    return jsonify({'result':'success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)