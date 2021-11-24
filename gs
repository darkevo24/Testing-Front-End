On branch board-9006-perminataan-data
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/containers/Perminataan/Forum/index.js
        modified:   src/containers/Perminataan/index.js

no changes added to commit (use "git add" and/or "git commit -a")
> ga
> git status
On branch board-9006-perminataan-data
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/containers/Perminataan/Forum/index.js
        modified:   src/containers/Perminataan/index.js

> git add .
> git status
On branch board-9006-perminataan-data
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/containers/Perminataan/Forum/index.js
        modified:   src/containers/Perminataan/index.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>...  (o discard changes in working directory)
        modified:   src/containers/CMS/Dashboard/index.js
        modified:   src/utils/constants.js

> git add .
> git commit -m "feat: add link to cms dashboard"
yarn run v1.22.10
$ /Users/mau/Documents/delta/sengkuyung/portal-sdi-front-end/node_modules/.bin/lint-staged
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up... 
✨  Done in 3.71s.
✔ feat: ✨ add link to cms dashboard

[board-9006-perminataan-data 69064c4] feat: ✨ add link to cms dashboard
 4 files changed, 15 insertions(+), 7 deletions(-)
> git push origin board-9006-perminataan-data
Enumerating objects: 25, done.
Counting objects: 100% (25/25), done.
Delta compression using up to 12 threads
Compressing objects: 100% (12/12), done.
Writing objects: 100% (13/13), 1.25 KiB | 1.25 MiB/s, done.
Total 13 (delta 9), reused 0 (delta 0), pack-reused 0
remote: 
remote: To create a merge request for board-9006-perminataan-data, visit:
remote:   https://gitlab.com/deltaapp1/portal-sdi-front-end/-/merge_requests/new?merge_request%5Bsource_branch%5D=board-9006-perminataan-data
remote: 
To https://gitlab.com/deltaapp1/portal-sdi-front-end.git
   1c7ca4a..69064c4  board-9006-perminataan-data -> board-9006-perminataan-data
> git status
On branch board-9006-perminataan-data
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   src/containers/Perminataan/detail.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/assets/styles/utilities/_spacing.scss
        modified:   src/components/Table.js
        modified:   src/containers/App/AppRoutes.js
        modified:   src/containers/Perminataan/Forum/index.js
        modified:   src/containers/Perminataan/detail.js
        modified:   src/containers/Perminataan/index.js
        modified:   src/containers/Perminataan/slice.js
        modified:   src/utils/constants.js

> git add .
> git commit -m "chore: removed konfirmasi popup from creation form"
yarn run v1.22.10
$ /Users/mau/Documents/delta/sengkuyung/portal-sdi-front-end/node_modules/.bin/lint-staged
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up... 
✨  Done in 4.07s.
✔ chore: 🔧 removed konfirmasi popup from creation form

[board-9006-perminataan-data 8bff476] chore: 🔧 removed konfirmasi popup from creation form
 8 files changed, 77 insertions(+), 49 deletions(-)
 create mode 100644 src/containers/Perminataan/detail.js
> git push origin board-9006-perminataan-data
Enumerating objects: 38, done.
Counting objects: 100% (38/38), done.
Delta compression using up to 12 threads
Compressing objects: 100% (20/20), done.
