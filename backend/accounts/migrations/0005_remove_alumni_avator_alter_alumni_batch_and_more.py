# Generated by Django 4.1.2 on 2022-12-03 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_alumni_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumni',
            name='avator',
        ),
        migrations.AlterField(
            model_name='alumni',
            name='batch',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='alumni',
            name='cgpa',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='alumni',
            name='is_employed',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='alumni',
            name='is_student',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='alumni',
            name='program',
            field=models.CharField(max_length=200),
        ),
    ]
