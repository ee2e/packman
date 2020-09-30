# Generated by Django 2.1.15 on 2020-09-30 11:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('checks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CheckImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checklist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='checks.Supplies')),
            ],
        ),
        migrations.CreateModel(
            name='Date',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('weather', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Pictureset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('urlpicture', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Recommend',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='recommend_date', to='utilities.Date')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='recommend_place', to='utilities.Place')),
                ('stuffs', models.ManyToManyField(blank=True, related_name='recommend_stuff', to='checks.Stuff')),
            ],
        ),
    ]
