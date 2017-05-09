import mongoose from 'mongoose';
import Review from './review-model';
import _ from 'lodash';

const params = (req, res, next, _id) => {
  let id = _id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    // Ref: http://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    User.findById(id).exec()
      .then(
        user=>{
          if (!user) {
            res.status(404).send(`No user with id: ${id}`);
          } else {
            req.user = user;
            next();
          }
        },
        err=>{
          next(err);
        }
      );
  } else {
      res.status(404).send(`Invalid user id: ${id}`);
  }
};



const assignReviewer = (req, res, next) => {
  //  http POST http://localhost:3000/api/reviews/assign-reviewer id_reviewee=5910d74940cc1240252299b5 ids_reviewer:=['1']
  const id_reviewee = _.get(req.body, `id_reviewee`, void 0).toString();
  const ids_reviewer_next = _.get(req.body, `ids_reviewer`, []).map(item => (item).toString());

  console.log('uuuuuuuuuuuu: ', id_reviewee );

  // if (id_reviewee.match(/^[0-9a-fA-F]{24}$/)) {
    Review.find({'reviewee':id_reviewee}, 'reviewer -_id').then(
      review_reviewers =>{
        const ids_reviewer_prev = review_reviewers.map( item => item.reviewer);
        worker(ids_reviewer_prev, ids_reviewer_next);
      }
    );
  // } else {
  //   console.log('xxxxxxxxxxxxxxx')
  //     // res.status(404).send(`Invalid user id: ${ids_reviewer_next}`);
  // }

  function worker(ids_prev, ids_next) {
    // Do a diff to find the different set of ids between
    // ids_reviewer_next and ids_reviewer_prev
    //    ids missing in previous > create review
    //    ids missing in next > delete review

    const ids_reviewer_toCreate = _.difference(ids_next, ids_prev);
    const ids_reviewer_toDel = _.difference(ids_prev, ids_next);
    console.log('ids_prev, ids_next: ', ids_prev, ids_next)

    console.log('ids_reviewer_toCreate', ids_reviewer_toCreate);
    console.log('ids_reviewer_toDel', ids_reviewer_toDel);

    const reviewsCreated = []; // to be return to client
    const reviewsDeleted = []; // to be return to client

    // // Interate through ids of reviewer to create a review for reviewee
    // ids_reviewer_toCreate.forEach(
    //   id_reviewer => {
    //     P_createReview(id_reviewee, id_reviewer).then(
    //       reviewJustCreated=>{
    //         reviewsCreated.push(reviewJustCreated);
    //       },
    //       err=>{ next(err); }
    //     );
    //   });
    //
    // // Interate through ids of reviewer to delete the reviews for reviewee
    // ids_reviewer_toDel.forEach(
    //   id_reviewer => {
    //     P_deleteReview(id_reviewee, id_reviewer).then(
    //       reviewJustDeleted=>{
    //         reviewsDeleted.push(reviewJustDeleted);
    //       },
    //       err=>{ next(err); }
    //     );
    //   });
  };

  function P_createReview(reviewee, reviewer, content='') {
    const reviewToCreate = { reviewee, reviewer, content };
    return Review.create(reviewToCreate)
  };

  function P_deleteReview(reviewee, reviewer, content='') {
    const reviewToDel = {}// @TODO
    return Review.del(reviewToDel)
  };

  // res.status(201).json(#<{(| reviewsCreated |)}>#);
  res.status(201).json({'donefornow':'done for now'}/* reviewsCreated */);
};



// export default {params, assignReviewer, post, get, getOne, put, del};
export default {params, assignReviewer};
