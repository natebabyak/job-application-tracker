from enum import Enum


class Status(str, Enum):
    ACCEPTED = "accepted"
    DECLINED = "declined"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    SUBMITTED = "submitted"
