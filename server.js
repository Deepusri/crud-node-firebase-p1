const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')

app.use(express.json())

const veggies = {
    'carrot': 'orange',
    'beetroot': 'green',
    'tomato': 'red',
    'potato': 'brown',
    'onion' : 'pink',
}

app.get('/veggies', async (req, res) => {
    const vegRef = db.collection('vegetables').doc('colors')
    const doc = await vegRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

app.get('/veggies/:name', (req, res) => {
    const { name } = req.params
    if (!name || !(name in veggies)) {
        return res.sendStatus(404)
    }
    res.status(200).send({ [name]: veggies[name] })
})

app.post('/addveggy', async (req, res) => {
    const { name, status } = req.body
    const vegRef = db.collection('vegetables').doc('colors')
    const res2 = await vegRef.set({
        [name]: status
    }, { merge: true })
    // veggies[name] = status
    res.status(200).send(veggies)
})

app.patch('/changestatus', async (req, res) => {
    const { name, newStatus } = req.body
    const vegRef = db.collection('vegetables').doc('colors')
    const res2 = await vegRef.set({
        [name]: newStatus
    }, { merge: true })
    // veggies[name] = newStatus
    res.status(200).send(veggies)
})

app.delete('/veggies', async (req, res) => {
    const { name } = req.body
    const vegRef = db.collection('vegetables').doc('colors')
    const res2 = await vegRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(veggies)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))