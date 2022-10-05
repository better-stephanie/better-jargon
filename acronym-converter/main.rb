require 'csv'
require 'json'

input_file = "betterment-acronym-handbook.csv"
output_file = "../better-jargon-api/src/main/resources/definitions/words.json"

dictionary = Array.new
rows = CSV.foreach(input_file, headers: true)
rows = rows.drop(1)
rows.each do |row|
    word = row[0]
    short_definition = row[1]
    long_definition = row[2]
    url = row[3]

    entry = Hash.new
    entry["word"] = word
    entry["short_definition"] = short_definition
    entry["long_definition"] = long_definition
    entry["url"] = url

    dictionary.push(entry)
end

File.open(output_file,"w") do |f|
  f.write(JSON.pretty_generate(dictionary))
end
# puts JSON.pretty_generate(dictionary)