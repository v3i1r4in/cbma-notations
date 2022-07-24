File -> ProgressionGroupWithTags:+ IgnorableLines {% ([ progressionGroups ]) => {
	const progressions = [];
	for (const progressionGroup of progressionGroups) {
		for (const progression of progressionGroup) {
			progressions.push(progression);
		}
	}
    const result = {
        progressions,
        toString() {
            return `---\n${this.progressions.join('\n')}`;
        }
    }
    result.toString.bind(result);

	return result;
} %}

ProgressionGroupWithTags -> IgnorableLines Tags "--" "-":+ "\n" ProgressionGroup {% ([ _1, tags,  _2, _3, _4, progressions]) => {
	const result = [];
	for (const progression of progressions) {
        const newProg = {
			...progression,
			tags:[ ...tags, ...progression.tags],
		};
        newProg.toString.bind(newProg);
		result.push(newProg);
	}
	return result;
} %}

ProgressionGroup -> ProgressionWithTags:+ {% ([ progressions ]) => progressions %}

IgnorableLine -> Comment | WhiteLine
IgnorableLines -> IgnorableLine:* {% () => null %}

Comment -> "#" .:* "\n"
WhiteLine -> " ":* "\n"

ProgressionWithTags -> IgnorableLines Tags ChordProgression {% 
    ([_, tags, progression ]) => {
        res = ({ 
            ...progression,
            tags,
        });
        res.toString.bind(res);
        return res;
    }
%}
Tags -> Tag:* {% id %}
Tag -> "@" TagKey ":" OptionalSpaces TagValue "\n"  {%
    function(data) {
        const [ _1, key, _4, _5, value, ] = data;
        return {
            key,
            value,
            toString() {
                return `@${key}: ${value}\n`
            }
        };
    }
%}
TagKey -> [0-9a-z]:+ {% ([d]) => d.join('') %}
TagValue -> [0-9a-zA-Z\-\_':] [0-9a-zA-Z\-\_': ]:* {% ([f, d]) => `${f}${d.join('')}` %}
ChordProgression ->  ChordSlot Separator ChordSlot Separator ChordSlot Separator ChordSlot ConnectingSeparator ChordGroup {%
    function(data) {
        const [ slot0, _1, slot1, _2, slot2, _3, slot3, _4, connectingChord ] = data;
        const obj = {
            slot0,
            slot1,
            slot2,
            slot3,
            connectingChord,
        };

        obj.toString = function() {
            return `${this.tags && this.tags.length ? this.tags.join('') : ''}${this.slot0} | ${this.slot1} | ${this.slot2} | ${this.slot3} > ${this.connectingChord.join("=")}`;
        }

        obj.toString.bind(obj);
        return obj;
    }
%}
Separator -> OptionalSpaces "|" OptionalSpaces
ConnectingSeparator -> OptionalSpaces ">" OptionalSpaces
RequiredSpaces    -> " ":+
OptionalSpaces    -> " ":*
ChordSlot -> 
      ChordGroup {%
    function(data) {
        const [ primaryChord ] = data;
        return {
            primaryChord,
            toString() {
                return `${primaryChord.join("=")}`
            }
        };
    }
%}
    | ChordGroup RequiredSpaces ChordGroup {%
    function(data) {
        const [ primaryChord, _, secondaryChord ] = data;
        return {
            primaryChord,
            secondaryChord,
            toString() {
                return `${primaryChord.join("=")} ${secondaryChord.join("=")}`
            }
        };
    }
%}
ChordGroup -> Chord | ChordGroup "=" Chord {%
    function(data) {
        const [ chords, _, chord ] = data;
        
        const chordsSet = new Set();
        for (const c of chords) {
            chordsSet.add(c.toString());
        }

        if (chordsSet.has(chord.toString())) {
            return chords;
        }

        return [
            ...chords,
            chord
        ];
    }
%}
Chord -> MajorMinor Degree Inversion BorrowedKey {%
    function(data) {
        const [ majorMinor, degree, inversion, borrowedKey ] = data;
        return {
            majorMinor,
            degree,
            inversion,
            borrowedKey,
            toString() {
                return `${majorMinor || ""}${degree}${inversion ? `/${inversion}` : ''}${borrowedKey ? `(${borrowedKey})` : ''}`
            }
        }
    }
%}
MajorMinor  -> 
                  null {% id %}
                | "M" {% id %} 
                | "m" {% id %}
Degree      -> 
                  "1" {% id %}
                | "2" {% id %}
                | "3" {% id %}
                | "4" {% id %}
                | "5" {% id %}
                | "6" {% id %}
                | "7" {% id %}
Inversion   -> 
                  null {% id %}
                | "/1" {% () => "1" %}
                | "/2" {% () => "2" %}
                | "/3" {% () => "3" %}
BorrowedKey -> 
                  null {% id %}
                | "(" Key ")" {% ([ _1, key, _2 ]) => key %}
Key         -> 
                  "A" {% id %}
                | "B" {% id %}
                | "C" {% id %}
                | "D" {% id %}
                | "E" {% id %}
                | "F" {% id %}
                | "G" {% id %}