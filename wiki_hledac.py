import wikipedia

wikipedia.set_lang("cz")

db = {}

def wiki_search(word):
    """This function takes one string, searches wikipedia for that word and returns summary of the searched page. If page does not exist it returns list of suggestions"""
    try:
        # get list of pages based on word search, if it matches return the page summary
        search_list = wikipedia.search(word)
        if search_list[0].lower() == word.lower():
            result = wikipedia.summary(word)
            add_db = {word: result}
            db.update(add_db)
            print(result)
        # if not return list of pages containing search word
        else:
            print(
                f"Článek s tímto názvem: \"{word}\" nebyl nalezen. Zadaný text se vysktuje v článcích s tímto názvem:")
            for item in search_list:
                print(item)
    # return list of pages if searched word is a disambiguation page
    except wikipedia.exceptions.DisambiguationError as err:
        print(
            f"Článek s tímto názvem: \"{word}\" nebyl nalezen. Zadaný text se vysktuje v článcích s tímto názvem:")
        for item in err.options:
            print(item)
    # return page does not exists if nonsense input submitted
    except wikipedia.exceptions.PageError and IndexError:
        print("Zadaný výraz neexistuje, zkuste prosím jiný.")


def check_db(word):
    """This function takes one string and checks database for previous searches. If found it returns the value for searched key, if not it returns False"""
    result = False
    for key in db.keys():
        if word == key:
            result = db[key]
            break
    return result


def main():

    run = True

    while run:

        word_search = input("\nZadejte hledaný výraz: ")

        # check for searched word in db and return content if there is any
        in_db = check_db(word_search)

        if in_db != False:
            print(in_db)
        else:
            wiki_search(word_search)

        again = True

        while again:
            # search again or quit
            quit_program = input("\nPřejete si hledat znovu? (a/n): ")
            if quit_program.lower() == "n":
                again = False
                run = False
                print("Ukončuji program")
            elif quit_program.lower() != "a":
                print("Nerozumím!")
            else:
                again = False


if __name__ == '__main__':
    main()
