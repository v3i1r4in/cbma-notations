const { Grammar, Parser } = require('nearley');
const { grammars: { chordProgressions }} = require('../index');

const fileToBeParsed = `
# some comments here

---
6 | 6 | 6 | 6 > 6

# some comments there

@genre: celtic
---
6 | 1 | M2 | M3(F) > 6
6 | 6 | 1  | M2    > 6

@piece: Kishi Ou no Hokori
@genre: celtic
---
# section A
@at: start
6 | M2/2 | 6 M2 | M3(F) > 6
@at: ending
6 | M2/2 | 4 5  | 6     > 1

# section B
@at: start
1 | 2 | M3(F) | M3(F) > 4 

# some white spaces in the end

`;

function newParser() {
    return new Parser(Grammar.fromCompiled(chordProgressions));
}

test('parse chord progression file successfully', () => {
    const parser = newParser();
    parser.feed(fileToBeParsed);
    expect(parser.results).toMatchSnapshot();
});

test('parse chord progression stringify produces valid chord progression file', () => {
    const parser = newParser();
    parser.feed(fileToBeParsed);

    const stringified = `${parser.results}`;
    expect(stringified).toMatchSnapshot();

    // re-parse the 'toString' should yeild to the same parsed structure.
    const anotherParser = newParser();
    anotherParser.feed(stringified);
    expect(JSON.stringify(anotherParser.results)).toMatch(JSON.stringify(parser.results));
});
