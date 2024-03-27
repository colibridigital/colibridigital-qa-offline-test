from __future__ import annotations

import datetime
from typing import Any

from core.models import Item
from django.core.management import BaseCommand
from loguru import logger

INITIAL_DATA = [
    {"done": True, "title": "Buy milk", "details": "1l of milk"},
    {
        "done": False,
        "title": "Buy cookies",
        "details": "6 chocolate chip cookies",
    },
    {
        "done": False,
        "title": "Eat milk and cookies",
        "details": "Yum!",
        # "created": "2024-02-20:10-43-56",
    },
]


class Command(BaseCommand):
    """
    Sets the user access to the platform

    python src/manage.py changeuseraccess --email tiago.silva@colibridigital.io --level admin
    """

    def handle(self, *args: Any, **options: Any) -> None:
        """
        Handles with the update of a user via email.
        """
        for item in INITIAL_DATA:
            created = datetime.datetime.now(datetime.timezone.utc)

            logger.info(f"Creating item: {item['title']} @ {str(created)}")

            Item.objects.update_or_create(
                title=item["title"],
                defaults={
                    "details": item["details"],
                    "done": item["done"],
                    "created": created,
                },
            )

        logger.success("Items created successfully!")
