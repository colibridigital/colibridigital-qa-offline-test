from __future__ import annotations

from django.db import models


class Item(models.Model):
    """
    Representation of an item in the `TODO` application.\
    title: "Buy milk",
    details: "1l of milk",
    created: "2024-02-20:10-23-56",
    edited: "2024-02-20:11-11-11",
    """

    done = models.BooleanField(default=False)
    title = models.CharField(max_length=255, null=False, blank=False)
    details = models.TextField(max_length=2000, null=True, blank=True)
    created = models.DateTimeField(null=False, blank=False, auto_now_add=True)
    edited = models.DateTimeField(null=False, blank=False, auto_now=True)

    def __str__(self) -> str:
        return f"{self.title} @ {self.created}"
