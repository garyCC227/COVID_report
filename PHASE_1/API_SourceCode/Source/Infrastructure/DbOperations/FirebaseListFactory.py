class FirebaseListFactory:
    def make(self, query):
        result = []
        stream = query.stream()
        for doc in stream:
            elem = doc.to_dict()
            elem['id'] = doc.id
            result.append(elem)
        return result
