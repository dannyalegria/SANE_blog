UPDATE blogs
set
  title     = COALESCE($2, title),
  author    = COALESCE($3, author),
  imageurl  = COALESCE($4, imageurl),
  content   = COALESCE($5, content)
WHERE id = $1

RETURNING * ;
