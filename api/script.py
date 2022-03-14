#!/usr/bin/env python3

import os

while True:
  try:
    word_len = int(input("Enter the word length: "))
    break
  except:
    print("Please enter a valid number!\n")
    continue

path = os.getcwd()

save_file_name = f"/{word_len}_letter_words.txt"

with open(path + "/words_alpha.txt", "r") as main_file, open(path + save_file_name, "w+") as save_file:

  print(f"\nSaving all {word_len} letter words to a file...")

  word_count = 0

  for word in main_file:
    word = word.lower().strip()

    if word_len == len(word):
      word_count += 1
      save_file.write(word + "\n")

print(f"\n{word_count} word{'' if word_count == 1 else 's'} saved in file {save_file_name[1:]} 🥳")

