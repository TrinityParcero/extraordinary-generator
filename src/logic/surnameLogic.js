const Patronym = "PATRONYM";
const None = "NONE";
const Special = "SPECIAL";
const Standard = "STANDARD";

// TODO: find a less hardcoded solution to this
const lastNameMap = {
    "somali": Patronym,
    "amharic": Patronym,
    "oromo": Patronym,
    "igbo": Patronym,
    "quechua": None,
    "aztecan": None,
    "algonquin": None,
    "athabaskan": None,
    "muskogean": None,
    "gaulic": None,
    "ancientGreek": None,
    "norse": Patronym,
    "chinese": Standard,
    "japanese": Standard,
    "mongolian": Patronym,
    "korean": Standard,
    "indian": Standard,
    "welsh": Standard,
    "cornish": Standard,
    "english": Standard,
    "gaelic": Standard,
    "russian": Standard,
    "polish": Standard,
    "hungarian": Standard,
    "greek": Standard,
    "italian": Standard,
    "spanish": Standard,
    "arabic": Standard,
    "hebrew": Standard,
    "armenian": Standard,
    "aboriginal": None,
    "romani": Standard,
    "finnish": Standard,
    "swedish": Standard,
    "danish": Standard,
    "dutch": Standard,
    "french": Standard,
    "german": Standard
};