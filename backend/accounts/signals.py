from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BulkAlumni

@receiver(post_save, sender=BulkAlumni)
def parse_file_on_save(sender, instance, created, **kwargs):
    if created:
        instance.parse_file()
    