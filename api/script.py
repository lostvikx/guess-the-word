#!/usr/bin/env python3

# The file words_list.txt had "bad words", that I removed.
# "Bad words": A word that contains a punctuation mark or appears in the list multiple times.

import os
import string

while True:
  try:
    word_len = int(input("Enter the word length: "))
    break
  except:
    print("Please enter a valid number!\n")
    continue

path = os.path.dirname(__file__)
word_file_name = "/words_list.txt"
save_file_name = f"/{word_len}_letter_words.txt"

with open(path + word_file_name, "r") as main_file, open(path + "/out" + save_file_name, "w+") as save_file:

  print(f"\nSaving all {word_len} letter words to a file...")

  word_count = 0

  for word in main_file:
    word = word.lower().strip()

    if word_len == len(word):
      word_count += 1
      save_file.write(word + "\n")

print(f"\n{word_count} word{'' if word_count == 1 else 's'} saved in file {save_file_name[1:]} 🥳")
