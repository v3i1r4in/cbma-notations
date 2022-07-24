// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "File$ebnf$1", "symbols": ["ProgressionGroupWithTags"]},
    {"name": "File$ebnf$1", "symbols": ["File$ebnf$1", "ProgressionGroupWithTags"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "File", "symbols": ["File$ebnf$1", "IgnorableLines"], "postprocess":  ([ progressionGroups ]) => {
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
        } },
    {"name": "ProgressionGroupWithTags$string$1", "symbols": [{"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ProgressionGroupWithTags$ebnf$1", "symbols": [{"literal":"-"}]},
    {"name": "ProgressionGroupWithTags$ebnf$1", "symbols": ["ProgressionGroupWithTags$ebnf$1", {"literal":"-"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ProgressionGroupWithTags", "symbols": ["IgnorableLines", "Tags", "ProgressionGroupWithTags$string$1", "ProgressionGroupWithTags$ebnf$1", {"literal":"\n"}, "ProgressionGroup"], "postprocess":  ([ _1, tags,  _2, _3, _4, progressions]) => {
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
        } },
    {"name": "ProgressionGroup$ebnf$1", "symbols": ["ProgressionWithTags"]},
    {"name": "ProgressionGroup$ebnf$1", "symbols": ["ProgressionGroup$ebnf$1", "ProgressionWithTags"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ProgressionGroup", "symbols": ["ProgressionGroup$ebnf$1"], "postprocess": ([ progressions ]) => progressions},
    {"name": "IgnorableLine", "symbols": ["Comment"]},
    {"name": "IgnorableLine", "symbols": ["WhiteLine"]},
    {"name": "IgnorableLines$ebnf$1", "symbols": []},
    {"name": "IgnorableLines$ebnf$1", "symbols": ["IgnorableLines$ebnf$1", "IgnorableLine"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IgnorableLines", "symbols": ["IgnorableLines$ebnf$1"], "postprocess": () => null},
    {"name": "Comment$ebnf$1", "symbols": []},
    {"name": "Comment$ebnf$1", "symbols": ["Comment$ebnf$1", /./], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Comment", "symbols": [{"literal":"#"}, "Comment$ebnf$1", {"literal":"\n"}]},
    {"name": "WhiteLine$ebnf$1", "symbols": []},
    {"name": "WhiteLine$ebnf$1", "symbols": ["WhiteLine$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WhiteLine", "symbols": ["WhiteLine$ebnf$1", {"literal":"\n"}]},
    {"name": "ProgressionWithTags", "symbols": ["IgnorableLines", "Tags", "ChordProgression"], "postprocess":  
        ([_, tags, progression ]) => {
            res = ({ 
                ...progression,
                tags,
            });
            res.toString.bind(res);
            return res;
        }
        },
    {"name": "Tags$ebnf$1", "symbols": []},
    {"name": "Tags$ebnf$1", "symbols": ["Tags$ebnf$1", "Tag"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Tags", "symbols": ["Tags$ebnf$1"], "postprocess": id},
    {"name": "Tag", "symbols": [{"literal":"@"}, "TagKey", {"literal":":"}, "OptionalSpaces", "TagValue", {"literal":"\n"}], "postprocess": 
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
        },
    {"name": "TagKey$ebnf$1", "symbols": [/[0-9a-z]/]},
    {"name": "TagKey$ebnf$1", "symbols": ["TagKey$ebnf$1", /[0-9a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TagKey", "symbols": ["TagKey$ebnf$1"], "postprocess": ([d]) => d.join('')},
    {"name": "TagValue$ebnf$1", "symbols": []},
    {"name": "TagValue$ebnf$1", "symbols": ["TagValue$ebnf$1", /[0-9a-zA-Z\-\_': ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TagValue", "symbols": [/[0-9a-zA-Z\-\_':]/, "TagValue$ebnf$1"], "postprocess": ([f, d]) => `${f}${d.join('')}`},
    {"name": "ChordProgression", "symbols": ["ChordSlot", "Separator", "ChordSlot", "Separator", "ChordSlot", "Separator", "ChordSlot", "ConnectingSeparator", "ChordGroup"], "postprocess": 
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
        },
    {"name": "Separator", "symbols": ["OptionalSpaces", {"literal":"|"}, "OptionalSpaces"]},
    {"name": "ConnectingSeparator", "symbols": ["OptionalSpaces", {"literal":">"}, "OptionalSpaces"]},
    {"name": "RequiredSpaces$ebnf$1", "symbols": [{"literal":" "}]},
    {"name": "RequiredSpaces$ebnf$1", "symbols": ["RequiredSpaces$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "RequiredSpaces", "symbols": ["RequiredSpaces$ebnf$1"]},
    {"name": "OptionalSpaces$ebnf$1", "symbols": []},
    {"name": "OptionalSpaces$ebnf$1", "symbols": ["OptionalSpaces$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "OptionalSpaces", "symbols": ["OptionalSpaces$ebnf$1"]},
    {"name": "ChordSlot", "symbols": ["ChordGroup"], "postprocess": 
        function(data) {
            const [ primaryChord ] = data;
            return {
                primaryChord,
                toString() {
                    return `${primaryChord.join("=")}`
                }
            };
        }
        },
    {"name": "ChordSlot", "symbols": ["ChordGroup", "RequiredSpaces", "ChordGroup"], "postprocess": 
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
        },
    {"name": "ChordGroup", "symbols": ["Chord"]},
    {"name": "ChordGroup", "symbols": ["ChordGroup", {"literal":"="}, "Chord"], "postprocess": 
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
        },
    {"name": "Chord", "symbols": ["MajorMinor", "Degree", "Inversion", "BorrowedKey"], "postprocess": 
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
        },
    {"name": "MajorMinor", "symbols": [], "postprocess": id},
    {"name": "MajorMinor", "symbols": [{"literal":"M"}], "postprocess": id},
    {"name": "MajorMinor", "symbols": [{"literal":"m"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"1"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"2"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"3"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"4"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"5"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"6"}], "postprocess": id},
    {"name": "Degree", "symbols": [{"literal":"7"}], "postprocess": id},
    {"name": "Inversion", "symbols": [], "postprocess": id},
    {"name": "Inversion$string$1", "symbols": [{"literal":"/"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Inversion", "symbols": ["Inversion$string$1"], "postprocess": () => "1"},
    {"name": "Inversion$string$2", "symbols": [{"literal":"/"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Inversion", "symbols": ["Inversion$string$2"], "postprocess": () => "2"},
    {"name": "Inversion$string$3", "symbols": [{"literal":"/"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Inversion", "symbols": ["Inversion$string$3"], "postprocess": () => "3"},
    {"name": "BorrowedKey", "symbols": [], "postprocess": id},
    {"name": "BorrowedKey", "symbols": [{"literal":"("}, "Key", {"literal":")"}], "postprocess": ([ _1, key, _2 ]) => key},
    {"name": "Key", "symbols": [{"literal":"A"}], "postprocess": id},
    {"name": "Key", "symbols": [{"literal":"B"}], "postprocess": id},
    {"name": "Key", "symbols": [{"literal":"C"}], "postprocess": id},
    {"name": "Key", "symbols": [{"literal":"D"}], "postprocess": id},
    {"name": "Key", "symbols": [{"literal":"E"}], "postprocess": id},
    {"name": "Key", "symbols": [{"literal":"F"}], "postprocess": id},
    {"name": "Key", "symbols": [{"literal":"G"}], "postprocess": id}
]
  , ParserStart: "File"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
