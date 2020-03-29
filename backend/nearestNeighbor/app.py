from flask import Flask, request
import redis

app = Flask(__name__)


import re
from simhash import Simhash, SimhashIndex
# def get_features(s):
#     width = 3
#     s = s.lower()
#     s = re.sub(r'[^\w]+', '', s)
#     return [s[i:i + width] for i in range(max(len(s) - width + 1, 1))]

# data = {1: 'How are you? I Am fine. blar blar blar blar blar Thanks.',
#     2: 'How are you i am fine. blar blar blar blar blar than',
#     3: 'This is simhash test.',}


r = redis.Redis(host='localhost', port=6379, db=0)

all_redis_docs = []
for key in r.keys():
    all_redis_docs.append( (key.decode(), Simhash(str(r.get(key).decode()))))
    
print(all_redis_docs)

index = SimhashIndex(all_redis_docs,k=3)
@app.route('/', methods=['GET', 'POST'])
def main():

    
    if request.method == 'POST':

        document = request.json['json']

        # check if redis is empty
        if len(r.keys()) == 0:
            r.set(str(Simhash(document).value), document) 
            return {"message":"The redis cache was empty. Just populated it with your document"}
        #if redis not empty
        else:
           
            # get all redis docs, make sure its a list of tuples
            s1 = Simhash(document)
            i = index.get_near_dups(s1)
            index.add(str(s1.value), s1)
            simdocs = []
            for num in i:
                simdocs.append(r.get((num)))
            r.set(str(s1.value), document)

            return {"docs":simdocs}

    return {"status":"meme"}
# # Dimension of the vectors.
# d = 256

# # Vectors to be indexed, each represented by d / 8 bytes, layed out sequentially,
# # i.e. the i-th vector starts at db[i * (d / 8)].
# db = ...

# # Vectors to be queried from the index.
# queries = ...

# # Initializing index.
# index = faiss.IndexBinaryFlat(d)

# # Adding the database vectors.
# index.add(db)

# # Number of nearest neighbors to retrieve per query vector.
# k = ...;

# # Querying the index
# D, I = index.search(queries, k)

# # D[i, j] contains the distance from the i-th query vector to its j-th nearest neighbor.
# # I[i, j] contains the id of the j-th nearest neighbor of the i-th query vector.

        # if bool(data) == False: # dictionary is empty
        #     #some action
        #     data[1] = hash_
        #     # r.set(1, hash_)
        #     return {"status":"populated dict"}

        # objs = [(str(k),Simhash(get_features(v))) for k, v in data.items()]
        # objs = []

        # for k,v in data.items():
        #     t = (str(k), Simhash(get_features(v)))
        #     print(str(Simhash(get_features(v)).value))
        #     print(type(Simhash(get_features(v)).value))
        #     print(get_features(v))
        #     objs.append(t)

        #     # r.set(simhash, document)


        # print("objs", objs)
        # index = SimhashIndex(objs, k=3)
        # print("index", index)

        # print("index bucket size", index.bucket_size())

        # s1 = Simhash(get_features(hash_))
        # print(index.get_near_dups(s1))

        # index.add('4', s1)
        # print(index.get_near_dups(s1))
        # return {"status":"meme"}
if __name__ == "__main__":
    app.run(debug=True)