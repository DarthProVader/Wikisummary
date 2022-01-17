import wikipedia
from flask import Flask, request, render_template
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

wikipedia.set_lang("cz")


@app.route("/")
def test_page():
    return render_template("main_page.html")


class WikiSearch(Resource):

    def get(self, word):
        """This function takes one string, searches wikipedia for that word and returns summary of the searched page. If page does not exist it returns list of suggestions"""

        try:
            # get list of pages based on word search, if first result matches the search return the page summary
            search_list = wikipedia.search(word)
            if search_list[0].lower() == word.lower():
                result = wikipedia.summary(word)
                return {word: result}

            # if not return list of pages containing search word
            else:
                suggested_pages = []
                for item in search_list:
                    suggested_pages.append(item)
                    return {"suggested_pages": suggested_pages}

        # return list of pages if searched word is a disambiguation page
        except wikipedia.exceptions.DisambiguationError as err:

            suggested_pages = []
            for item in err.options:
                suggested_pages.append(item)
                return {"suggested_pages": suggested_pages}
        # return page does not exists if nonsense input submitted
        except wikipedia.exceptions.PageError and IndexError:

            #print("Zadaný výraz neexistuje, zkuste prosím jiný.")
            return {'word': None}, 404


api.add_resource(WikiSearch, "/search/<string:word>")

if __name__ == '__main__':
    app.run()
