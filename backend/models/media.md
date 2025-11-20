# Rules for media objects:
1. If filetype is profilepic, it is assumed the profile pic is unique per user.
2. If filetype is audio, retrieve via projectName.
    - projectName is not necessarily unique in backend as implementation may work without it; however, frontend will have safeguards to make unique anyways.
    - not implemented yet so idk actually
