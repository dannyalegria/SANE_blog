DELETE FROM blogs 
WHERE id = $1
RETURNING *;
