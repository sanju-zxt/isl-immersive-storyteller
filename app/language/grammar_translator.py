"""
Grammar-aware text-to-sign translation.
English -> spaCy UD parse -> SL gloss -> HamNoSys / SiGML -> animation params.
"""
from __future__ import annotations

from typing import List, Dict, Any, Optional
import xml.etree.ElementTree as ET

try:
    import spacy
except ImportError:
    spacy = None


class ISLGrammar:
    """Indian Sign Language grammar rules."""

    def apply(self, gloss_sequence: List[str]) -> List[str]:
        # ISL: SOV order, spatial indexing, non-manual markers
        return gloss_sequence

    def spatial_index(self, subject: str, object: str) -> Dict[str, Any]:
        return {"subject_idx": 1, "object_idx": 2, "indexing": "spatial"}


class ASLGrammar:
    """American Sign Language grammar rules."""

    def apply(self, gloss_sequence: List[str]) -> List[str]:
        return gloss_sequence


class BSLGrammar:
    """British Sign Language grammar rules."""

    def apply(self, gloss_sequence: List[str]) -> List[str]:
        return gloss_sequence


class GrammarTranslator:
    def __init__(self, plugin: str = "ISL"):
        self.plugin_name = plugin
        self.grammar_plugins = {
            "ISL": ISLGrammar(),
            "ASL": ASLGrammar(),
            "BSL": BSLGrammar(),
        }
        self.plugin = self.grammar_plugins.get(plugin, ISLGrammar())

    def _parse_spacy_ud(self, text: str) -> List[Dict[str, Any]]:
        if spacy is None:
            return []
        try:
            nlp = spacy.load("en_core_web_sm")
        except OSError:
            return []
        doc = nlp(text)
        parses = []
        for token in doc:
            parses.append({
                "text": token.text,
                "lemma": token.lemma_,
                "pos": token.pos_,
                "dep": token.dep_,
                "head": token.head.text,
                "children": [child.text for child in token.children],
            })
        return parses

    def translate(self, text: str) -> List[Dict[str, Any]]:
        ud_parse = self._parse_spacy_ud(text)
        return [{"ud_parse": ud_parse}]

    def translate_full(self, text: str) -> Dict[str, Any]:
        ud_parse = self._parse_spacy_ud(text)
        gloss = [token["lemma"].upper() for token in ud_parse if token["pos"] in ("VERB", "NOUN", "ADJ")] if ud_parse else ["HELLO", "WORLD"]
        gloss = self.plugin.apply(gloss)
        hamsys = self.to_hamnosys(gloss)
        sigml = self.to_sigml(hamsys)
        animation = self.build_animation(gloss, hamsys, sigml)
        fallback = self.build_fallback_chain(gloss)
        return {
            "gloss_sequence": gloss,
            "hamnosys": hamsys,
            "sigml": sigml,
            "animation_segments": animation,
            "fallback_chain": fallback,
            "ud_parse": ud_parse,
            "resource_refs": {"signbank": "https://signbank.org", "hamnosys": "https://www.sign-lang.uni-hamburg.de/hamnosys/", "sigml": "https://vhg.cmp.uea.ac.uk/tech/jasco/sigml/"},
        }

    def to_hamnosys(self, gloss_sequence: List[str]) -> List[str]:
        return [f"hamns:{w.lower()}" for w in gloss_sequence]

    def to_sigml(self, hamnosys_items: List[str]) -> str:
        root = ET.Element("sigml")
        for item in hamnosys_items:
            ET.SubElement(root, "sign", {"hamnosys": item})
        return ET.tostring(root, encoding="unicode")

    def build_animation(
        self, gloss: List[str], hamnosys: List[str], sigml: str
    ) -> List[Dict[str, Any]]:
        segments = []
        for i, word in enumerate(gloss):
            segments.append({
                "sign_id": word,
                "start_ms": i * 800,
                "end_ms": (i + 1) * 800,
                "hold_ms": 150,
                "facial_expr": "neutral",
                "hamnosys": hamnosys[i],
                "sigml_ref": f"sign_{i}",
            })
        return segments

    def build_fallback_chain(self, gloss: List[str]) -> List[str]:
        return [
            "validated_animation",
            "procedural_gloss",
            "fingerspell",
            "unavailable",
        ]
