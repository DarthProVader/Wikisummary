# Wýcuc

The web app that lets users search for wikipedia summary of the inserted word.
When it is not able to find exact match it offers alternatives just like wikipedia does.

## Running the app locally

To run the app locally you need to have Python installed as well as these libraries

`flask`
`wikipedia `

Then just clone the repo to your files and run `app.py`.
It is now accessible on localserver port 5000 by default.

## Changing language

The UI itself is in Czech, however, it is possible to change the language of the results.
In `app.py` change `wikipedia.set_lang("cz")` to your desired language. English is default.

## About
The project started as an CLI program in python but evolved to the current state of the webapp. 
Its main purpose is for my practice with Flask API and Javascript

