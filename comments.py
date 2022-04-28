from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
client = MongoClient('localhost', 27017)
db = client.challenge

app = Flask(__name__)

challenge_id = ObjectId("625e3a1cfff55ed3225a27ae")


@app.route('/comment')
def home():
    return render_template('index.html', cid=challenge_id)


# get comments
@app.route('/api/comment/<challenge_id>', methods=["GET"])
def get_comments(challenge_id):
    challenge_id = ObjectId(challenge_id)
    comments = list(db.comments.find(
        {'challenge_id': challenge_id},
        {'challenge_id': False, 'password': False}))

    for comment in comments:
        comment['_id'] = str(comment['_id'])

    return jsonify({'comments': comments})


# add comment
@app.route('/api/comment', methods=["POST"])
def add_comment():
    data = {
        'challenge_id': ObjectId(request.form['challenge_id']),
        'name': request.form['name'],
        'password': request.form['password'],
        'index': len(list(db.comments.find({}, {'_id': False}))),
        'comment': request.form['comment']
    }

    db.comments.insert_one(data)

    return jsonify({"msg": "Success"})


# modify comment
@app.route('/api/comment', methods=["PUT"])
def modify_comment():
    id = ObjectId(request.form['object_id'])
    pw = request.form['pw']

    comment = list(db.comments.find({'_id': id, "password": pw}))
    if (len(comment) > 0):
        data = {
            'name': request.form['name'],
            'comment': request.form['comment']
        }
        db.comments.update_one({'_id': id}, {'$set': data})
        return jsonify({"msg": "Success"})
    else:
        return jsonify({"msg": "Failed"})


# remove comment
@app.route('/api/comment', methods=["DELETE"])
def remove_comment():
    id = ObjectId(request.form['object_id'])
    pw = request.form['pw']

    comment = list(db.comments.find({'_id': id, "password": pw}))
    if (len(comment) > 0):
        db.comments.delete_one({"_id": id})
        return jsonify({"msg": "Success"})
    else:
        return jsonify({"msg": "Failed"})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5500, debug=True)
