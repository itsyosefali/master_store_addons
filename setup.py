from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in master_store_addons/__init__.py
from master_store_addons import __version__ as version

setup(
	name="master_store_addons",
	version=version,
	description="my-first-app",
	author="ebkar.ly",
	author_email="no",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
