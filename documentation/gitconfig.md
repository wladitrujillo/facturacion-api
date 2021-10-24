## Git config credentials

```
git config credential.helper store

git pull
```
## In change of change password

Removes the offending user+password from the ~/.git-credentials file, so now re-run
```
git pull
```