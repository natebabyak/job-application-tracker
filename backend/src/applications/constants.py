from enum import Enum


class Level(str, Enum):
    INTERN = "intern"
    ENTRY = "entry-level"
    JUNIOR = "junior"
    MID = "mid-level"
    SENIOR = "senior"
    STAFF = "staff"
    PRINCIPAL = "principal"
    DISTINGUISHED = "distinguished"
    FELLOW = "fellow"


class Status(str, Enum):
    ACCEPTED = "accepted"
    DECLINED = "declined"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    SUBMITTED = "submitted"
