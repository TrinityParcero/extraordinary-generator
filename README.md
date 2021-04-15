# Extraordinary Generator of Things

## Summary

This is something I've been working on on-and-off since college, started as a very basic name generator for a homework assignment. I mainly wanted to make my own name generator as someone who makes a lot of characters for TTRPGs and other projects, and was disappointed with the ones I found online being either entirely common boring names like "John Waters" and "Stacy Adams" or Full-On Fantasy stuff like "Riluaneth Wysaxidor" or "Morluk Battlespell". Being very into classic D&D media, I saw Gary Gygax's Extraordinary Book of Names as a good place to start for getting a variety of names. After finishing the first pass at the Extraordinary Generator of Names, I decided I may as well keep going and make some other random generator tools I often find myself wishing I had on hand while playing or DMing. 


## Summary / Status of Each Tool

### Names
Random name generator taking the bulk of its content from The Extraordinary Book of Names by Gary Gygax. Allows filtering by name origin/culture, and gender.

Status
- Functioning! Pending a redesign to move to Node/React instead of raw HTML/CSS with awkward JS logic.

Known Issues / Planned Improvements
- Source material is pretty biased towards European cultures - names from African, Asian, and Native American cultures are fewer and (at least in some cases) less authentic. Name lists for those cultures should be double checked against more reliable sources and augmented / edited. On the same note - I feel that having an "Other" section feels somewhat dismissive towards the cultures listed therein - would like to get more related name sources so they can be split into more descriptive categories instead of being lumped together.
- Current implementation is pretty messy code-wise, since I started it very early in my JS learning process. I plan to clean it up by moving to a Node/React structure.


### Characters
Random character generator that lets you tailor result by race, class, etc. 

Status
- In progress - Icebox. Will be picked up once Node/React redesign of name and trinket generators is complete, as I'll pull components and stuff from those to complete this more cleanly and efficiently.


### Trinkets
Random trinket generator that lets you filter by which sourcebooks trinkets are pulled from.

Status
- Functioning! Pending a redesign to move to Node/React instead of raw HTML/CSS with awkward JS logic.

Known Issues / Planned Improvements
- Current implementation is pretty messy code-wise, since I started it very early in my JS learning process. I plan to clean it up by moving to a Node/React structure.
- CSS could use a little tweaking, result display gets a little wonky when displaying a large number of results.



### Magic Items
Random magic item generator, might be expanded to a general random loot generator?

Status
- Not started yet. Will be picked up once character generator is functioning.
