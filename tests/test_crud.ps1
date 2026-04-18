$base = 'http://localhost:3000/todos'

Write-Host "POST -> créer une tache"
$body = @{ titre = 'test desde ps' } | ConvertTo-Json
$r = Invoke-RestMethod -Method Post -Uri $base -Body $body -ContentType 'application/json' -ErrorAction Stop
Write-Host "Créé:" ($r | ConvertTo-Json -Compress)

Write-Host "GET -> liste"
$l = Invoke-RestMethod -Method Get -Uri $base -ErrorAction Stop
Write-Host ($l | ConvertTo-Json -Compress)

$id = $r.id
Write-Host "PUT -> modifier"
$upd = @{ titre = 'mis à jour' } | ConvertTo-Json
Invoke-RestMethod -Method Put -Uri "$base/$id" -Body $upd -ContentType 'application/json' -ErrorAction Stop

Write-Host "DELETE -> supprimer"
Invoke-RestMethod -Method Delete -Uri "$base/$id" -ErrorAction Stop

Write-Host "Vérif final GET"
$l2 = Invoke-RestMethod -Method Get -Uri $base -ErrorAction Stop
Write-Host ($l2 | ConvertTo-Json -Compress)
