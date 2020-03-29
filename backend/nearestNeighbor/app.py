from flask import Flask, request
import faiss 
app = Flask(__name__)


hash_db = []
d = 256
k = 3
index = faiss.IndexBinaryFlat(d)
@app.route('/', methods=['GET', 'POST'])
def main():

    
    if request.method == 'POST':

        hash_brown = request.body.project_hash

        if len(db) != 0:
            index.add(db)
        
        queries = hash_brown
        D, I = index.search(queries, k)
        
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