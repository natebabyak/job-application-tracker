from enum import Enum


class Provider(str, Enum):
    DISCORD = "discord"
    GITHUB = "github"


class Theme(str, Enum):
    DARK = "dark"
    LIGHT = "light"
    SYSTEM = "system"
