class FirebaseListFactory:
    def make(self, query):
        result = []
        stream = query.stream()
        for elem in stream:
            result.append(elem.to_dict())
        return result
