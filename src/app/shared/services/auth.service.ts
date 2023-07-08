import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, from, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, first, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore,QueryFn  } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private fbAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {
    this.user$ = fbAuth.user;
  }

  redirect(): Observable<boolean> {
    return from(this.fbAuth.getRedirectResult()).pipe(
      map((res) => {
        if (res.user) {
        this.userService.save(res.user);
          return true;
        } else {
          return false;
        }
      }),
      first()
    );
  }

  // login() {
  //   this.fbAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  //   const redirectUrl =
  //     this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', redirectUrl);
  // }

  async register(dataUser: AppUser) :Promise<boolean> {
    console.log('user service registro'+dataUser);
    try {
    const {user}=  await this.fbAuth.createUserWithEmailAndPassword(
        dataUser.email,
        dataUser.password
      );
      await this.updateUserData(user,dataUser);
      this.logout();
      return true;
    } catch (error) {
      console.log('ERROR'+error);
      return false;
      //window.alert(this.firebaseError.codeError(error.code));
    }
  }

  async login(dataUser: AppUser):Promise<boolean> {
    try {
    await this.fbAuth.signInWithEmailAndPassword(
        dataUser.email,
        dataUser.password
      )
    return true;
    }
      catch (error) {
      console.log(error);
      return false;
    }
  }




  private updateUserData(userCredencial,user: AppUser){

    return this.db
      .collection('users')
      .doc(userCredencial.uid)
      .set(
        {
          uid: userCredencial.uid,
          email: user.email,
          name: user.name,
          password: user.password,
          isAdmin: false,
          isEmployee: false,
          // photoURL: user.photoURL,
        },
        { merge: true }
      )
      .then(() => {

        console.log('se creo');
       
      })
      .catch(() => {
        console.error('error');
      
      });
  }

  logout() {
    this.fbAuth.signOut();
  }
  getAllClientes(){
    console.log('entre');
    const queryFn: QueryFn = (ref) => ref.where('isAdmin', '==', false).where('isEmployee', '==', false);
    return this.db.collection('users', queryFn).valueChanges({ idField: 'uid' }) as Observable<AppUser[]>;
  }
  getUser(userId: string): Observable<AppUser>{
    return this.db.doc<AppUser>(`users/${userId}`).valueChanges();
  }

 get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}
