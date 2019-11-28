export const calculateRisk = (allTickets, allComments, thisTicket, tickets) => {
  let priceRisk = 0;
  let authorRisk = 0;
  let hourRisk = 0;
  let commentsRisk = 0;
  //calculate number of author's tickets
  const ticketsByAuthor = allTickets.filter(
    ticket => ticket.userId == thisTicket.userId
  ).length;

  //calculate time of creation
  const timeOfCreation = thisTicket.createdAt;
  const hourOfCreation = parseInt(timeOfCreation.slice(11, 13)) + 1;

  //calculate comments
  const filterAuthorComments = allComments.filter(
    comment => comment.userId !== thisTicket.userId
  );
  const commentsNumber = filterAuthorComments.length;

  //calculate ticket avg price
  const ticketsPrices = tickets.map(ticket => parseInt(ticket.price));
  const ticketsAveragePrice = ticketsPrices.reduce((total, price) => {
    return (total += price / ticketsPrices.length);
  }, 0);

  //calculate difference
  const percentageDifference =
    100 *
    ((Number(thisTicket.price) - ticketsAveragePrice) /
      ((Number(thisTicket.price) + ticketsAveragePrice) / 2));

  //check for difference
  if (percentageDifference > 10) {
    priceRisk -= 10;
  } else if (percentageDifference > 0 && percentageDifference < 10) {
    priceRisk -= percentageDifference;
  } else {
    priceRisk -= percentageDifference;
  }

  //check author's tickets
  if (ticketsByAuthor === 1) {
    authorRisk += 10;
  }

  //check business hour risky or not
  if (hourOfCreation < 9 || hourOfCreation > 16) {
    hourRisk += 10;
  } else hourRisk -= 10;

  //calculate comments length risk
  if (commentsNumber > 3) {
    commentsRisk = 5;
  }

  //add all risks
  const finalRisk = priceRisk + authorRisk + hourRisk + commentsRisk;
  //final result
  if (finalRisk < 5) {
    return 5;
  } else if (finalRisk > 95) {
    return 95;
  } else return finalRisk;
};