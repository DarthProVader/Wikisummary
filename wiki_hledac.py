import wikipedia

wikipedia.set_lang("cz")

db = {}

def check_wiki_add_db(word):
    try:
        result = wikipedia.summary(word)
        add_db = {word:result}
        db.update(add_db)
    except wikipedia.exceptions.DisambiguationError as err:
        result = err.options
    return result
    
def check_db(word):
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
        in_db = check_db(word_search)

        if in_db != False:
            print(in_db)
        else:
            try:
                search_list = wikipedia.search(word_search)
                if search_list[0].lower() == word_search.lower():
                    result = wikipedia.summary(word_search)
                    add_db = {word_search:result}
                    db.update(add_db)
                    print(result)
                else:
                    print(f"Článek s tímto názvem: \"{word_search}\" nebyl nalezen. Zadaný text se vysktuje v článcích s tímto názvem:")
                    for item in search_list:
                        print(item)
            except wikipedia.exceptions.DisambiguationError as err:
                print(f"Článek s tímto názvem: \"{word_search}\" nebyl nalezen. Zadaný text se vysktuje v článcích s tímto názvem:")
                for item in err.options:
                    print(item)
            except wikipedia.exceptions.PageError:
                print("Zadaný výraz neexistuje, zkuste prosím jiný.")

        again = True

        while again:
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