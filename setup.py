# flask setup file to Make the Project Installable

from setuptools import find_packages, setup

setup(
    name='flaskhome',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
