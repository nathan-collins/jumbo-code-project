export default class JumboHelper {
  /**
   * @param {Number} releaseDate
   * @param {Boolean} yearOnly Return only the year value
   * @return {String} Release date formatted accordingly
   */
  static formatReleaseDate = (releaseDate, yearOnly = false) => {
    var date = new Date(releaseDate);
    if (!yearOnly) {
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month} ${date.getFullYear()}`;
    }
    return `${date.getFullYear()}`;
  };

  /**
   * @param {Number} voteAverage Vote average result
   * @return {String} Percentage value of popularity
   */
  static calculatePopularity(voteAverage) {
    return `${voteAverage * 10}%`;
  }

  /**
   *
   * @param {Number} runtime The duration of the movie
   * @return {String} Duration formatted in hour and minutes
   */
  static formatRuntime(runtime) {
    if (!runtime) return '';
    var hours = Math.floor(runtime / 60);
    var minutes = runtime % 60;

    return `${hours}h ${minutes}min`;
  }
}
