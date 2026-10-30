# Grammar-Aware Text-to-Sign Pipeline Design

## Pipeline
English text -> spaCy UD parse -> SL gloss rules -> HamNoSys/SiGML -> animation params

## Components
1. Linguistic model: SL grammar rules (topic-comment, classifiers, spatial agreement) - ISLGrammar implemented with SOV, spatial_index, non-manual markers
2. Pipeline stages: spaCy UD parse implemented via spacy.load("en_core_web_sm"), gloss rules applied, HamNoSys strings generated, SiGML XML built
3. Resources: SignBank, HamNoSys, SiGML references loaded (docs/resources.md)
4. ISL-specific: SOV order, spatial indexing, non-manual markers in ISLGrammar
5. Modular grammar plugins per language (ISLGrammar, ASLGrammar, BSLGrammar)
6. Output: structured animation sequence (timing, holds, transitions, facial expr)
7. Fallback chain: validated animation -> procedural from gloss -> fingerspell -> unavailable
8. Editor: user corrects gloss sequence before animation
