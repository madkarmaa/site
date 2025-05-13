# Windows Explorer's performance SUCKS

> Yes, that's right, especially on older hardware.

## The PUF

> "Potentially Unwanted Feature"

There's a feature in Windows Explorer that, while potentially useful to some users, can significantly slow down your browsing experience and unnecessarily stress your SSD. It's called **Automatic Folder Discovery**.

## What does it do?

This feature loads the contents of a folder and attempts to guess its type in order to adjust the view accordingly.

For example, when you open `%USERPROFILE%\Pictures`, the icons are automatically set to a larger size to show previews of your images.

This behavior not only slows down navigation but also puts stress on your SSD, as it reads files and writes thumbnails data to cache them on disk.

## How can you fix it?

Fortunately, there's a simple solution that involves a few registry changes.

### Step 1

Two registry keys need to be deleted:

```
HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\Bags
```

This key stores information about every folder that has been discovered and its assigned view.

```
HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\BagMRU
```

This key serves as a views lookup table linked to the `Bags` key.

### Step 2

Next, create a new key:

```
HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\Bags\AllFolders\Shell
```

Then add a new string value called `FolderType` with the value `NotSpecified` to this key.

### Step 3

Log out of your account or restart your computer to apply the changes.

## Prefer an automated solution?

If you'd rather not make these changes manually, simply paste the following code into PowerShell (**running as admin**):

```powershell
Remove-Item -Path "HKCU:\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\Bags" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "HKCU:\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\BagMRU" -Recurse -Force -ErrorAction SilentlyContinue

$allFolders = "HKCU:\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\Bags\AllFolders\Shell"

New-Item -Path $allFolders -Force
New-ItemProperty -Path $allFolders -Name "FolderType" -Value "NotSpecified" -PropertyType String -Force
```

## Don't like it?

If you decide this optimization isn't for you, reverting is straightforward. Simply run the following PowerShell commands (**as administrator**) to delete the custom registry settings:

```powershell
Remove-Item -Path "HKCU:\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\Bags" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "HKCU:\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\BagMRU" -Recurse -Force -ErrorAction SilentlyContinue
```

After running these commands, log out of your account or restart your computer to allow Windows to rebuild its default folder view settings.

## Conclusion

After applying these changes, Windows Explorer should be noticeably faster and more responsive, especially on older systems.

> This blog post was inspired by [Enderman's video on YouTube](https://www.youtube.com/watch?v=ctMyvJsBSzI&t=1073s)
