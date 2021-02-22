$(function () {
    $('.demo').on('change', function () {
        console.log('change')
    })

    $('.demo').on('keyup', function () {
        console.log('keyup')
    })
})