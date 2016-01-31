cards = [
  { num: '5', suit: 'spades' },
  { num: '4', suit: 'hearts' },
  { num: '6', suit: 'spades' },
  { num: 'ace', suit: 'diamonds' },
  { num: '3', suit: 'hearts' },
  { num: '5', suit: 'hearts' },
  { num: '6', suit: 'clubs' },
  { num: '7', suit: 'spades' },
  { num: 'ace', suit: 'hearts' }
]

intervals = [30, 50, 70, 100, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000]
intervals = _.flatten(_.map(intervals, (interval) -> [interval, interval]))

Card = Backbone.Model.extend

CardView = Backbone.View.extend
  template: _.template '
    <div id="progress">Card <span class="cur">1</span>/<span class="total">10</span></div>
    <div id="card">
      <img />
    </div>
    <div id="response">
      <div class="prompt">Which card did you see?</div>
      <div class="option">
        <button data-value="unknown">I don\'t know</button>
      </div>
      <div class="option">
        <div class="num">
          <div class="card-group">
            <button class="card-opt" data-num="ace" data-suit="spades">A</button>
            <button class="card-opt" data-num="ace" data-suit="clubs">A</button>
            <button class="card-opt" data-num="ace" data-suit="hearts">A</button>
            <button class="card-opt" data-num="ace" data-suit="diamonds">A</button>
          </div>
          <div class="card-group">
            <button class="card-opt" data-num="2" data-suit="spades">2</button>
            <button class="card-opt" data-num="2" data-suit="clubs">2</button>
            <button class="card-opt" data-num="2" data-suit="hearts">2</button>
            <button class="card-opt" data-num="2" data-suit="diamonds">2</button>
          </div>
          <div class="card-group">
            <button class="card-opt" data-num="3" data-suit="spades">3</button>
            <button class="card-opt" data-num="3" data-suit="clubs">3</button>
            <button class="card-opt" data-num="3" data-suit="hearts">3</button>
            <button class="card-opt" data-num="3" data-suit="diamonds">3</button>
          </div>
          <div class="card-group">
            <button class="card-opt" data-num="4" data-suit="spades">4</button>
            <button class="card-opt" data-num="4" data-suit="clubs">4</button>
            <button class="card-opt" data-num="4" data-suit="hearts">4</button>
            <button class="card-opt" data-num="4" data-suit="diamonds">4</button>
          </div>
          <div class="card-group">
            <button class="card-opt" data-num="5" data-suit="spades">5</button>
            <button class="card-opt" data-num="5" data-suit="clubs">5</button>
            <button class="card-opt" data-num="5" data-suit="hearts">5</button>
            <button class="card-opt" data-num="5" data-suit="diamonds">5</button>
          </div>
          <div class="card-group">
            <button class="card-opt" data-num="6" data-suit="spades">6</button>
            <button class="card-opt" data-num="6" data-suit="clubs">6</button>
            <button class="card-opt" data-num="6" data-suit="hearts">6</button>
            <button class="card-opt" data-num="6" data-suit="diamonds">6</button>
          </div>
          <div class="card-group">
            <button class="card-opt" data-num="7" data-suit="spades">7</button>
            <button class="card-opt" data-num="7" data-suit="clubs">7</button>
            <button class="card-opt" data-num="7" data-suit="hearts">7</button>
            <button class="card-opt" data-num="7" data-suit="diamonds">7</button>
          </div>
        </div>
        <button data-value="none">None of the above</button>
      </div>
    </div>
  '

  initialize: ->
    @render()

  events:
    'click [data-value=unknown]': 'showNextIteration'
    'click [data-value=none]': 'showNextIteration'
    'click .card-opt': 'submit'

  submit: (event) ->
    opt = $(event.target)
    suit = opt.data('suit')
    num = "#{opt.data('num')}"
    correct = @card.suit is suit && @card.num is num
    console.log suit, num, @card, correct
    if correct
      @showNextCard()
    else
      @showNextIteration()

  showNextIteration: ->
    @showCard(@cardIndex, @intervalIndex + 1)

  startCard: (cardIndex) ->
    @showCard(cardIndex, 0)

  showNextCard: ->
    nextIndex = @cardIndex + 1
    if nextIndex > cards.length
      console.log 'done!'
    else
      @showCard(nextIndex, 0)

  showCard: (cardIndex, intervalIndex) ->
    @cardIndex = cardIndex
    @intervalIndex = intervalIndex

    @card = cards[cardIndex]
    interval = intervals[intervalIndex]
    console.info 'showing', @card, interval

    unless interval
      @showNextCard()
      return

    $card = $('#card')
    $response = $('#response')
    cardImg = $card.find('img')

    ask = ->
      $card.hide()
      $response.show()

    cardImg.attr('src', "assets/images/#{@card.num}_#{@card.suit}.svg")
    $response.hide()
    $card.show()
    setTimeout(ask, interval)

  render: ->
    console.log @$el
    @$el.html(@template(@model.attributes))

    @startCard(0)

$ ->
  new CardView(el: $('#tachistoscope'), model: new Card(name: '5_spades'))
