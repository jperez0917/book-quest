# Generated by Django 3.2 on 2022-04-06 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookquest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='isbn',
            field=models.CharField(default=9871234567890, max_length=500),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=300)),
                ('book', models.ManyToManyField(related_name='subject', to='bookquest.Book')),
            ],
        ),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=300)),
                ('book', models.ManyToManyField(related_name='author', to='bookquest.Book')),
            ],
        ),
    ]
